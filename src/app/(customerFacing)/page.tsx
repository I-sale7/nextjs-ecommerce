import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import db from "@/db/db"
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const getNewestProducts = cache(async () => {
  return await db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {orders: {_count: "desc"}},
    take: 6
  });
}, ["/", "getNewestProducts"], {revalidate: 60 * 60 * 24})

const getMostPopulerProducts = cache(async () => {
  return db.product.findMany({
    where: {isAvailableForPurchase: true},
    orderBy: {createdAt: "desc"},
    take: 6
  });
}, ["/", "getMostPopuplerProducts"], {revalidate: 60 * 60 * 24})

const Homepage = () => {
  return (
    <main className="space-y-12">
      <ProdcutGridSection title={"Most Popular"} productsFetcher={getMostPopulerProducts}/>
      <ProdcutGridSection title="Newest" productsFetcher={getNewestProducts}/>

    </main>
  )
}

export default Homepage

export const ProdcutGridSection = async ({productsFetcher, title}: {productsFetcher: () => Promise<Product[]>; title: string}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant={"outline"} asChild>
          <Link href={"/products"} className="space-x-2">
            <span>
              View All
            </span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }>
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductSuspense({
  productsFetcher
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  return ( await productsFetcher()).map(product => <ProductCard key={product.id} {...product}/>)
}