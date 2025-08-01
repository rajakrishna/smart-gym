// TODO: Style this page better
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { mockProduct } from '@/constants/mockData'



const CafeDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    const fetchProduct = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

            const response = await fetch(`${baseUrl}/api/cafe/items/${id}`)

            if (!response.ok) {
                throw new Error('Failed to fetch product')
            }

            const data = await response.json()

            console.log(data)

            return data
        } catch (error) {
            console.error('Error fetching product:', error)
            return null
        }
    }

    const product = await fetchProduct() || mockProduct


    return (
        <div className="container mx-auto px-4 py-6 max-w-md">
            {/* Header */}
            <h1 className="text-2xl font-bold text-center mb-6">{product?.name}</h1>

            {/* Product Image */}
            <div className="relative w-full h-80 bg-gray-100 rounded-xl mb-6">
                <Image
                    src={product?.product_image || ''}
                    alt={product?.name || ''}
                    fill
                    className="object-cover"
                    unoptimized
                    priority
                />
            </div>

            {/* Price */}
            <div className="text-right mb-4">
                <span className="text-xl font-bold">${product?.price.toFixed(2)}</span>
            </div>

            {/* Description */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="text-gray-800">
                    <p className="mb-2">{product?.product_description}</p>
                    {/* TODO: We should add this info to the db in the form of "Nutritional Info: Carbs: 10g, Protein: 10g, Fat: 10g, Calories: 100kcal" */}
                    {/* <p className="text-sm text-gray-600">{product?.product_nutritional_info || ''}</p> */}
                </div>
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full flex items-center justify-center gap-2 bg-gray-200 text-black hover:bg-gray-300">
                <ShoppingCart size={20} />
                add to cart
            </Button>
        </div>
    )
}

export default CafeDetailPage