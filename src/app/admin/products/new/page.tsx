import React from 'react'
import ProductForm from '../_components/form'
import PageHeader from '../../_components/header'

const NewProduct = () => {
  return (
    <div>
      <PageHeader title={'New Product'} />
      <ProductForm />
    </div>
  )
}

export default NewProduct
