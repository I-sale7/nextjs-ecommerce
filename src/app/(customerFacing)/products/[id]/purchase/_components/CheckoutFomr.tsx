import { fromatCurrency } from '@/lib/formaters'
import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type CheckoutFormProps = {
  product: Product
}
const CheckoutForm = ({product}: CheckoutFormProps) => {
  return (
    <div className='space-y-4 flex flex-col'>
      {/* Product Details */}
      <div className='flex gap-4 items-center'>
        <Image src={product.imagePath} alt={product.name} width={200} height={200}/>
        <div className='felx felx-col gap-2'>
          <h1 className='text-3xl'>{product.name}</h1>
          <span>{fromatCurrency(product.priceInCent / 100)}</span>
        </div>
      </div>

      {/* Checkout Form */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <label htmlFor='name'>Name</label>
          <input type="text" id='name' name='name' className='border p-2 rounded-md' />
        </div>
        <div className='flex gap-2'>
          <label htmlFor='email'>Email</label>
          <input type="email" id='email' name='email' className='border p-2 rounded-md' />
        </div>
        <div className='flex gap-2'>
          <label htmlFor='phone'>Phone</label>
          <input type="tel" id='phone' name='phone' className='border p-2 rounded-md' />
        </div>
        <div className='flex gap-2'>
          <label htmlFor='address'>Address</label>
          <input type="text" id='address' name='address' className='border p-2 rounded-md' />
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm