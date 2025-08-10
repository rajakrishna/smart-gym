// TODO: Style this page better
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { mockProduct } from '@/constants/mockData'
import Link from 'next/link'
import AddIndividualItemToCartButton from '@/components/members/cafe/buttons/AddIndividualItemToCartButton'



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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4 max-w-md">
                <div className="pt-6 pb-4">
                    <Button variant="ghost" className="p-0 h-auto text-gray-600 hover:text-gray-800 transition-colors" asChild>
                        <Link href="/member/cafe" className="flex items-center gap-2">
                            ← Back to Main Menu
                        </Link>
                    </Button>
                </div>

                {/* Product Card Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    {/* Product Image */}
                    <div className="relative w-full h-80 overflow-hidden">
                        <Image
                            src={product?.product_image || ''}
                            alt={product?.name || ''}
                            fill
                            className="object-cover"
                            unoptimized
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                        {/* Title and Price */}
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-2xl font-bold text-gray-900 flex-1">{product?.name}</h1>
                            <span className="text-2xl font-bold text-green-600 ml-4">${product?.price.toFixed(2)}</span>
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <p className="text-gray-700 leading-relaxed">{product?.product_description}</p>
                            {/* TODO: We should add this info to the db in the form of "Nutritional Info: Carbs: 10g, Protein: 10g, Fat: 10g, Calories: 100kcal" */}
                            {/* <p className="text-sm text-gray-600">{product?.product_nutritional_info || ''}</p> */}
                        </div>

                        <AddIndividualItemToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CafeDetailPage