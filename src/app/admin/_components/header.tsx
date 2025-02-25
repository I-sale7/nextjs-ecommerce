import React from 'react'

const PageHeader = ({title}: {title: string | React.ReactNode}) => {
  return (
    <h1 className='text-5xl font-bold'>
      {title}
    </h1>
  )
}

export default PageHeader
