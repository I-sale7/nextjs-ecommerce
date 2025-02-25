import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import db from '@/db/db'
import { formatNumber, fromatCurrency } from '@/lib/formaters'
import React from 'react'

const getSalesData = async ()=> {
  const data = await db.order.aggregate({
    _sum: {pricePaidInCent: true},
    _count: true
  })

  return {
    amount: (data._sum.pricePaidInCent || 0) / 100,
    numberOfSales: data._count
  }
}

const getUsersData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: {pricePaidInCent: true},
    })
  ])

  return {
    userCount,
    avarageValuePerUser: userCount === 0 ? 0 : 
      (orderData._sum.pricePaidInCent || 0) / userCount / 100
  }
}

const getProductsData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({where: {isAvailableForPurchase: true}}),
    db.product.count({where: {isAvailableForPurchase: false}})
  ])

  return {
    activeCount,
    inactiveCount
  }
}

const AdminDashboard = async () => {
  const [salesData, userData, productsData] = await Promise.all([
    getSalesData(),
    getUsersData(),
    getProductsData()
  ])
  return (
    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <DashbaordCard
        title='Sales' 
        description={`${formatNumber(salesData.numberOfSales)} Orders`}
        content={<p>{fromatCurrency(salesData.amount)}</p>} />

      <DashbaordCard 
        title='Customers'
        description={`${fromatCurrency(userData.avarageValuePerUser)} Avarage value`}
        content={<p>{userData.userCount}</p>} />

      <DashbaordCard 
        title='Products'
        description={`${formatNumber(productsData.inactiveCount)} Inactive`}
        content={<p>{`${formatNumber(productsData.activeCount)} Active`}</p>} />
    </div>
  )
}

export default AdminDashboard


const DashbaordCard = ({title, description, content}: {title: string, description: string, content: React.ReactNode}) => {
  return (
    <Card className='bg-primary text-primary-foreground'>
      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}