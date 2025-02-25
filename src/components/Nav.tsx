'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const Nav = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='bg-primary text-primary-foreground flex justify-center px-4'>
      {children}
    </div>
  )
}

export const NavLink = (props: Omit<React.ComponentProps<typeof Link>, 'className'>) => {
  const pathname = usePathname();
  return <Link {...props} className={cn(`p-4 hover:bg-secondary hover:text-secondary-foreground
    focus:bg-secondary focus:text-secondary-foreground`,
    pathname === props.href ? 'bg-background text-foreground' : '')} />
}
