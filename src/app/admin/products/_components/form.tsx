'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { fromatCurrency } from '@/lib/formaters';
import React, { useState } from 'react'
import { addProducts, updateProducts } from '../../_actions/products';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '@prisma/client';
import Image from 'next/image';

const ProductForm = ({product}: {product?: Product | null}) => {

  const [priceInCents, setPriceInCents]= useState<number | undefined>(product?.priceInCent);
  const [error, action] = useFormState(product == null ? addProducts : updateProducts.bind(null, product.id), {});

  return (
    <form action={action} className='space-y-8'>
      <div className='space-y-2'>
        <Label htmlFor='name'>Name</Label>
        <Input type='text' id='name'name='name' placeholder='Product Name' required defaultValue={product?.name || ""}/>
        {error.name && <p className='text-red-500'>{error.name}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='price'>Price</Label>
        <Input type='number' id='price'name='price' placeholder='Price' value={priceInCents}
        onChange={(e)=> setPriceInCents(Number(e.target.value) || undefined)} defaultValue={product?.priceInCent} required/>
        <div className='text-muted-foreground'>
          {fromatCurrency((priceInCents || 0) / 100)}
        </div>
        {error.price && <p className='text-red-500'>{error.price}</p>}
      </div>
      
      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea id='description' name='description' placeholder='Product Description' required defaultValue={product?.description || ""}/>
        {error.description && <p className='text-red-500'>{error.description}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='image'>Image</Label>
        <Input type='file' id='image'name='image' required={product == null}/>
        {product != null && (<Image src={product.imagePath} width={100} height={100} alt={product.name} />)}
        {error.image && <p className='text-red-500'>{error.image}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='file'>File</Label>
        <Input type='file' id='file'name='file' required={product == null}/>
        {product != null && (<code>{product.filePath}</code>)}
        {error.file && <p className='text-red-500'>{error.file}</p>}
      </div>

      <SubmitButton />

    </form>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
  )
}

export default ProductForm
