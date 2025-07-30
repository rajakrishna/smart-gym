import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'
import Image from 'next/image'
import React from 'react'
import { columns } from './columns'
import { EditIcon } from 'lucide-react'

interface Product {
    id: number
    name: string
    description: string
    image_url: string
    sales: number
    remaining_stock: number
    price: number
    type: string
}

const mockProducts = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 Description',
        image_url: '/cafe_stock_assets/ProteinBar.jpg',
        sales: 10,
        remaining_stock: 100,
        price: 10.99,
        type: 'Protein Bar',
    },
    {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 Description',
        image_url: '/cafe_stock_assets/SportsDrink.jpg',
        sales: 20,
        remaining_stock: 200,
        price: 20.50,
        type: 'Sports Drink',
    },
    {
        id: 3,
        name: 'Product 3',
        description: 'Product 3 Description',
        image_url: '/cafe_stock_assets/ProteinBar.jpg',
        sales: 30,
        remaining_stock: 300,
        price: 30.75,
        type: 'Protein Bar',
    },
    {
        id: 4,
        name: 'Product 4',
        description: 'Product 4 Description',
        image_url: '/cafe_stock_assets/SportsDrink.jpg',
        sales: 40,
        remaining_stock: 400,
        price: 40.25,
        type: 'Sports Drink',
    },
    {
        id: 5,
        name: 'Product 5',
        description: 'Product 5 Description',
        image_url: '/cafe_stock_assets/ProteinBar.jpg',
        sales: 50,
        remaining_stock: 500,
        price: 50.00,
        type: 'Protein Bar',
    },
    {
        id: 6,
        name: 'Product 6',
        description: 'Product 6 Description',
        image_url: '/cafe_stock_assets/SportsDrink.jpg',
        sales: 60,
        remaining_stock: 600,
        price: 60.95,
        type: 'Sports Drink',
    },
]

const data = [
    {
        orderID: 1,
        orderDate: '2025-01-01',
        customerName: 'John Doe',
        amountPaid: 100.00,
    },
    {
        orderID: 2,
        orderDate: '2025-01-02',
        customerName: 'Jane Smith',
        amountPaid: 200.00,
    },
    {
        orderID: 3,
        orderDate: '2025-01-03',
        customerName: 'Jim Beam',
        amountPaid: 300.00,
    },
    {
        orderID: 4,
        orderDate: '2025-01-04',
        customerName: 'John Doe',
        amountPaid: 100.00,
    },
]

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card>
            <CardHeader>
                <div className='w-full flex items-center'>
                    <div className='w-1/2 flex justify-center'>
                        <Image src={product.image_url} alt={product.name} width={100} height={100} />
                    </div>
                    <div className='w-1/2 flex flex-col gap-2 pr-4'>
                        <div className='text-sm text-gray-500'>{product.name}</div>
                        <div className='text-sm text-gray-500'>{product.type}</div>
                        <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.price}: ${product.price.toFixed(2)}</div>
                    </div>
                    {/* Edit */}
                    <Button className='flex items-center gap-2' variant='outline' size='icon'>
                        <EditIcon className='w-4 h-4' />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className='w-full flex flex-col gap-2'>
                    <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.description}</div>
                    <div className='text-sm text-gray-500'>{product.description}</div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-2 w-full">
                    <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.sales}: {product.sales}</div>
                    <Separator />
                    <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.remainingStock}: {product.remaining_stock}</div>
                </div>
            </CardFooter>
        </Card>
    )
}

const page = () => {
    const AddProductIcon = ICONS.adminCafePage.addProduct
    return (
        <div className="container mx-auto py-10 px-4">
            {/* Tabs to switch between items in cafe and transaction / order history */}
            <Tabs defaultValue="cafe" className="w-full">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="cafe">{LABELS.pages.admin_cafe.tabs.cafe}</TabsTrigger>
                        <TabsTrigger value="transactions">{LABELS.pages.admin_cafe.tabs.transactions}</TabsTrigger>
                    </TabsList>
                    <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                        {LABELS.pages.admin_cafe.buttons.addProduct} <AddProductIcon className='w-4 h-4' />
                    </Button>
                </div>
                <TabsContent value="cafe">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Map Product Cards */}
                        {mockProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="transactions">
                    <DataTable columns={columns} data={data} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default page