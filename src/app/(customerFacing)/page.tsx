import db from "@/db/db"
import { Product } from "@prisma/client";

async function getNewestProducts() {
  return await db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {orders: {_count: "desc"}},
    take: 6
  });
}

async function getMostPopulerProducts() {
  return await db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {createdAt: "desc"},
    take: 6
  });
}

const Homepage = () => {
  return (
    <main className="space-y-12">
      <ProdcutGridSection title={"Most Popular"} productsFetcher={getMostPopulerProducts}/>
      <ProdcutGridSection title="Newest" productsFetcher={getNewestProducts}/>

    </main>
  )
}

export default Homepage

export const ProdcutGridSection = ({productsFetcher, title}: {productsFetcher: () => Promise<Product[]>; title: string}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
    </div>
  )
}