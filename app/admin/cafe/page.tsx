'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { columns } from './columns'
import { EditIcon } from 'lucide-react'
import EditCafeProductModal from '@/components/admin/cafe/modals/EditCafeProductModal'
import CreateCafeProductModal from '@/components/admin/cafe/modals/CreateCafeProductModal'
import { mockProducts } from '@/constants/mockData'
import { Product } from '@/types/shared'

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
                        <Image src={product.product_image} alt={product.name} width={100} height={100} />
                    </div>
                    <div className='w-1/2 flex flex-col gap-2 pr-4'>
                        <div className='text-sm text-gray-500'>{product.name}</div>
                        <div className='text-sm text-gray-500'>{product.category}</div>
                        <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.price}: ${product.price.toFixed(2)}</div>
                    </div>
                    {/* Edit */}
                    <EditCafeProductModal product={product}>
                        <Button className='flex items-center gap-2' variant='outline' size='icon'>
                            <EditIcon className='w-4 h-4' />
                        </Button>
                    </EditCafeProductModal>
                </div>
            </CardHeader>
            <CardContent>
                <div className='w-full flex flex-col gap-2'>
                    <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.description}</div>
                    <div className='text-sm text-gray-500'>{product.product_description}</div>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-md p-2 w-full">
                    <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.sales}: {product.number_sold}</div>
                    <Separator />
                    <div className='text-sm text-gray-500'>{LABELS.pages.admin_cafe.productCard.remainingStock}: {product.quantity}</div>
                </div>
            </CardFooter>
        </Card>
    )
}

const Page = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const AddProductIcon = ICONS.adminCafePage.addProduct

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/cafe/items/getAll')

            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }

            const data = await response.json()

            if (!data || data.length === 0) {
                setProducts(mockProducts)
            } else {
                setProducts(data)
            }

        } catch (err) {
            console.error('Error fetching products:', err)
            setProducts(mockProducts)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="container mx-auto py-10 px-4">
            {/* Tabs to switch between items in cafe and transaction / order history */}
            <Tabs defaultValue="cafe" className="w-full">
                <div className="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="cafe">{LABELS.pages.admin_cafe.tabs.cafe}</TabsTrigger>
                        <TabsTrigger value="transactions">{LABELS.pages.admin_cafe.tabs.transactions}</TabsTrigger>
                    </TabsList>
                    <CreateCafeProductModal>
                        <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                            {LABELS.pages.admin_cafe.buttons.addProduct} <AddProductIcon className='w-4 h-4' />
                        </Button>
                    </CreateCafeProductModal>
                </div>
                <TabsContent value="cafe">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-500">Loading products...</div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product: Product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="transactions">
                    <DataTable columns={columns} data={data} />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Page