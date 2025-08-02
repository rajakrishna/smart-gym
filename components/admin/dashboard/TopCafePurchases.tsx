'use client'

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/types/shared';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
// import Link from 'next/link';

const TopCafePurchases = () => {
    const [topPurchases, setTopPurchases] = useState<Product[]>([]);

    useEffect(() => {
        const fetchTopPurchases = async () => {
            try {
                const response = await fetch('/api/cafe/items/topPurchases');

                if (!response.ok) {
                    throw new Error(`Failed to fetch top purchases: ${response.status}`);
                }

                const data = await response.json();
                setTopPurchases(data);
            } catch (error) {
                console.error('Error fetching top purchases:', error);
                setTopPurchases([]);
            }
        }
        fetchTopPurchases();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Top Cafe Purchases</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {topPurchases.map((purchase, index) => (
                    <Card key={index} className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden relative border-2 border-gray-200">
                        <Badge
                            variant="default"
                            className="absolute top-2 right-2 font-bold text-lg px-4 py-2 rounded-full shadow-md z-10"
                        >
                            #{index + 1}
                        </Badge>
                        {/* <Link href={`/admin/products/${purchase.product_id}`} key={index} className="w-full h-full"> */}
                        <CardHeader className="p-6 text-center bg-gray-100 h-full">
                            <div className="mb-4">
                                <Image
                                    src={purchase.product_image}
                                    alt={purchase.name}
                                    width={120}
                                    height={120}
                                    className="mx-auto rounded-lg object-cover"
                                />
                            </div>
                            <CardTitle className="text-xl font-semibold text-gray-800 leading-tight absolute bottom-35 left-0 right-0">
                                {purchase.name}
                            </CardTitle>
                        </CardHeader>
                        {/* </Link> */}
                        <CardContent className="p-6 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Units Sold:</span>
                            <span className="text-lg font-semibold text-blue-600">{purchase.number_sold}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div >
    )
}

export default TopCafePurchases