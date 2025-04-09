import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from './ui/card'
import { fromatCurrency } from '@/lib/formaters'
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

type ProductCardProps = {
  id: string;
  name: string;
  priceInCent: number;
  description: string;
  imagePath: string
}

export const ProductCard = ({id, name, priceInCent, description, imagePath}: ProductCardProps) => {
  return (
    <Card className='flex overflow-hidden flex-col'>
      <div className='w-full relative h-auto aspect-video'>
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardTitle>
        {name}
      </CardTitle>
      <CardDescription>
        {fromatCurrency(priceInCent / 100)}
      </CardDescription>
      <CardContent className='flex-grow'>
        <p className='line-clamp-1'>
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button className='w-full' size={'lg'} asChild>
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}


export const ProductCardSkeleton = () => {
  return (
    <Card className='flex overflow-hidden flex-col'>
      <div className='w-full bg-gray-300 aspect-video'></div>
      <CardTitle>
        <div className='w-3/4 h-6 bg-gray-300'></div>
      </CardTitle>
      <CardDescription>
        <div className='w-1/2 h-4 bg-gray-300'></div>
      </CardDescription>
      <CardContent className='flex-grow'>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
        <div className='w-full h-4 rounded-full bg-gray-300'></div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' disabled size={'lg'}>
        </Button>
      </CardFooter>
    </Card>
  )
}