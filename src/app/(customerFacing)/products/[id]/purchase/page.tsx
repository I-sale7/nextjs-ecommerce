import db from "@/db/db";
import CheckoutForm from "./_components/CheckoutFomr";

export default async function PurchasePage({params}: {params: {id: string}}) {
  const product = await db.product.findUnique({where: {id: params.id}});
  if(!product) return;
  return <CheckoutForm product={product} />
}