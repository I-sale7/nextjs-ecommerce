import React from 'react'
import ProductForm from '../../_components/form'
import PageHeader from '../../../_components/header'
import db from '@/db/db'

const EditProduct = async ({params: {id}}: {params: {id: string}}) => {
  const product = await db.product.findUnique({where: {id}})
  return (
    <div>
      <PageHeader title={'Edit Product'} />
      <ProductForm product={product} />
    </div>
  )
}

export default EditProduct
