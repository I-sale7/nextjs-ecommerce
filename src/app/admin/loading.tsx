import { Loader2 } from 'lucide-react'
import React from 'react'

const AdminLoader = () => {
  return (
    <div className='flex items-center justify-center'>
      <Loader2 className='size-24 animate-spin' />
    </div>
  )
}

export default AdminLoader
