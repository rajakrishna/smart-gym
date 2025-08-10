'use client'

import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import { Product } from "@/types/shared"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const AddIndividualItemToCartButton = ({ product }: { product: Product | null }) => {
    const { addItem } = useShoppingCart()

    if (!product) return null

    const handleAddToCart = () => {
        addItem(product, 1)
    }

    return (
        <Button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-3 bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition-all duration-200 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
            <ShoppingCart size={22} />
            Add to Cart
        </Button>
    )
}

export default AddIndividualItemToCartButton