import React from 'react'
import PageHeader from '../_components/header'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import db from '@/db/db'
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react'
import { formatNumber, fromatCurrency } from '@/lib/formaters'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ActiveToggleDropdownItem, DeleteDropdownItem } from './_components/ProductActions'

const Products = () => {
  return (
    <>
      <div className='flex justify-between gap-4 w-full mt-10'>
        <PageHeader title={'Products'} />
        <Button >
          <Link href='/admin/products/new'>Add Prodcts</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  )
}

export const ProductsTable = async() => {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCent: true,
      isAvailableForPurchase: true,
      _count: {select: { orders: true }}
    }
  });

  if(products.length === 0) {
    return <p>No products found</p>
  }

  return (
    <Table className='mt-10'>
      <TableHeader>
        <TableRow>
          <TableHead className='w-0'>
            <span className='sr-only'></span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className='w-0'>
            <span className='sr-only'></span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className='w-0'>
              {product.isAvailableForPurchase ? <CheckCircle2 className='stroke-emerald-500' /> : <XCircle className='stroke-destructive'/>}
              <span className='sr-only'>Actions</span>
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatNumber(product._count.orders)}</TableCell>
            <TableCell>{ fromatCurrency( product.priceInCent / 100 )}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <MoreVertical />
                  <span className='sr-only'>Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a download href={`admin/products/${product.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />

                  <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default Products
