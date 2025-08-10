'use client';

// TODO: Add shopping cart and purchase functionality

import React, { useEffect, useState } from 'react'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@/components/ui/tabs'
import { Loader2, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { mockProducts } from '@/constants/mockData';
import { Product } from '@/types/shared';
import { CATEGORIES, DEFAULT_CATEGORY, CATEGORY_LABELS } from '@/constants/cafeConstants';
import { Button } from '@/components/ui/button';
import CheckoutPageModal from '@/components/members/cafe/modals/CheckoutPageModal';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';

const MenuItemCard = ({ product, quantity, onIncrease, onDecrease }: { product: Product, quantity: number, onIncrease: () => void, onDecrease: () => void }) => {
    return (
        <Card className="group overflow-hidden cursor-pointer">
            <Link href={`/member/cafe/${product.product_id}`} className="block">
                <CardContent className="p-0 relative">
                    <Image
                        src={product.product_image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
                </CardContent>
            </Link>
            <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary text-center my-2">
                    {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2 text-center">
                    {product.product_description}
                </CardDescription>
                <div className="pt-1">
                    <span className="text-xl font-bold text-green-600 text-center flex justify-center">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={onDecrease}
                        disabled={quantity === 0}
                    >
                        -
                    </Button>
                    <span className="px-3 py-1 bg-gray-100 rounded min-w-[2rem] text-center">{quantity}</span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={onIncrease}
                    >
                        +
                    </Button>
                </div>
            </CardHeader>
        </Card>
    )
}

const CafePage = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const { totalItems, totalPrice, addItem, removeItem, getItemQuantity } = useShoppingCart()

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/cafe/items/getAll')

                if (!response.ok) {
                    throw new Error('Failed to fetch products')
                }

                const data = await response.json()

                // eslint-disable-next-line no-console
                console.log(data, 'data')

                setProducts(data)
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching products:', error)
                setError('Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }

        getProducts()
    }, [])



    const filteredProducts = products.filter(product => {
        if (activeFilter === DEFAULT_CATEGORY) return true
        return product.category === activeFilter
    })

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
                            <div className="col-span-2 lg:col-span-3 flex flex-col justify-center items-center h-32 gap-2 text-center text-lg font-semibold">
                                <p className="text-gray-500">Loading Products...</p>
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <p className="text-gray-500">This may take a few seconds...</p>
                            </div>
                        ) : error ? (
                            <div className="col-span-2 lg:col-span-3 flex justify-center items-center h-32">
                                <p className="text-red-500">{error}</p>
                            </div>
                        ) : filteredProducts.map((product) => (
                            <MenuItemCard
                                key={product.product_id}
                                product={product}
                                quantity={getItemQuantity(product.product_id.toString()) || 0}
                                onIncrease={() => addItem(product, 1)}
                                onDecrease={() => removeItem(product.product_id.toString())}
                            />
                        ))}
                    </TabsContent>
                </Tabs>
            </div>
            {/* Checkout Button */}
            <CheckoutPageModal>
                <Button className="flex justify-center mx-auto w-4/5 fixed bottom-20 left-4 right-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 border-t shadow-lg">
                    <ShoppingCart className='w-4 h-4 mr-2' />
                    Checkout ({totalItems} items) - ${totalPrice.toFixed(2)}
                </Button>
            </CheckoutPageModal>
        </div>
    )
}

export default CafePage