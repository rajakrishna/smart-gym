'use client';

// TODO: Add shopping cart and purchase functionality

import React, { useEffect, useState } from 'react'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs'
import { Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { mockProducts } from '@/constants/mockData';
import { Product } from '@/types/shared';
import { CATEGORIES, DEFAULT_CATEGORY, CATEGORY_LABELS } from '@/constants/cafeConstants';

const MenuItemCard = ({ product }: { product: Product }) => {
    return (
        <Card>
            <Link href={`/member/cafe/${product.product_id}`} className='cursor-pointer'>
                <CardContent className="p-0">
                    <Image
                        src={product.product_image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className='w-full h-48 object-cover rounded-t-lg'
                    />
                </CardContent>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.product_description}</CardDescription>
                    <CardDescription className="text-lg font-semibold">${product.price.toFixed(2)}</CardDescription>
                </CardHeader>
            </Link>
        </Card>
    )
}

const CafePage = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeFilter, setActiveFilter] = useState<string>('all')

    const filteredProducts = products.filter(product => {
        if (activeFilter === DEFAULT_CATEGORY) return true
        return product.category === activeFilter
    })

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/cafe/items/getAll')

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()

                console.log(data, 'data')

                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
                setError('Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    return (
        <div className="container mx-auto pt-4 px-4 pb-10">
            {/* Cafe Menu Title */}
            <div className="flex justify-between items-center gap-4">
                <h1 className="flex justify-center mx-auto text-2xl font-bold text-center">Cafe Menu</h1>
            </div>

            {/* Cafe Badges Filters */}
            <div className="flex justify-center items-center gap-4 mt-4 mb-4">
                <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as string)}>
                    <TabsList className="mx-auto flex-wrap h-auto gap-1 p-1">
                        <TabsTrigger className="cursor-pointer text-sm px-3 py-2" value={DEFAULT_CATEGORY}>All</TabsTrigger>
                        {CATEGORIES.map((category) => (
                            <TabsTrigger key={category} className="cursor-pointer text-sm px-3 py-2" value={category}>{CATEGORY_LABELS[category]}</TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4' value={activeFilter}>
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loader2 className="w-8 h-8 animate-spin" />
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : filteredProducts.map((product) => (
                            <MenuItemCard
                                key={product.product_id}
                                product={product}
                            />
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default CafePage