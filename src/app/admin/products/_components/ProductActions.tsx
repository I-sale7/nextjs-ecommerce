'use client'

import React, { useTransition } from 'react'
import { deleteProduct, toggleProductAvailability } from '../../_actions/products';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export const ActiveToggleDropdownItem = ({id, isAvailableForPurchase}: {id: string, isAvailableForPurchase: boolean}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (<DropdownMenuItem
    disabled={isPending}
    onClick={()=> {
      startTransition(async () => {
        await toggleProductAvailability(id, !isAvailableForPurchase);
        router.refresh();
      })
    }}>
    {isAvailableForPurchase ? "Deactivate" : "Activate"}
  </DropdownMenuItem>
  )
}

export const DeleteDropdownItem = ({id, disabled}: {id: string, disabled: boolean}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (<DropdownMenuItem
    disabled={disabled || isPending}
    className='text-red-500 font-bold'
    onClick={()=> {
      startTransition(async () => {
        await deleteProduct(id);
        router.refresh();
    })
  }}>
    {"Delete"}
  </DropdownMenuItem>
  )
}
