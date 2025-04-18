'use server'

import db from "@/db/db";
import { z } from "zod";
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
 
const fileSchema = z.instanceof(File, {
  message: "File is required",});

const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith("image/"))

const addSchema = z.object({
  name: z.string(),
  price: z.coerce.number().int().min(1),
  description: z.string(),
  file: fileSchema.refine(file=> file.size > 0, {
    message: "File is required",
  }),
  image: imageSchema.refine(file=> file.size > 0, {
    message: "image is required",
  })
})

const editSchema = addSchema.extend({
  file: fileSchema.optional(),
  image: imageSchema.optional()
})

export async function addProducts(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if(!result.success) {
    return result.error.formErrors.fieldErrors
  } 
  
  const data = result.data;

  await fs.mkdir("products", {recursive: true})
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", {recursive: true})
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));


  await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCent: data.price,
      filePath: filePath,
      imagePath: imagePath
    }
  })

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProducts(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if(!result.success) {
    return result.error.formErrors.fieldErrors
  } 
  
  const data = result.data;
  const product = await db.product.findUnique({where: {id}});

  if(product == null) {
    return notFound();
  }

  let filePath = product.filePath;
  if(data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath);
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`;
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));
  }

  let imagePath = product.imagePath;
  if(data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`);
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
    await fs.writeFile(`public${imagePath}`, Buffer.from(await data.image.arrayBuffer()));
  }

  await db.product.update({
    where: {id},
    data: {
      name: data.name,
      description: data.description,
      priceInCent: data.price,
      filePath: filePath,
      imagePath: imagePath
    }
  })

  
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}


export async function toggleProductAvailability(id: string, isAvailableForPurchase: boolean) {
  await db.product.update({
    where: {id}, data: {isAvailableForPurchase}
  })
  
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({
    where: {id}
  })

  if(product == null) {
    return notFound();
  }

  await fs.unlink(product.filePath);
  await fs.unlink(`public${product.imagePath}`);
  
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}