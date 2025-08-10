'use client'

import { Product } from '@/types/shared'
import { Button } from '@/components/ui/button'
import { Dialog, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'
import { toast } from 'sonner'
import { useUser } from '@/context/user-context'

const CartItem = ({ item, quantity, updateQuantity, removeItem }: { item: Product, quantity: number, updateQuantity: (productId: string, quantity: number) => void, removeItem: (productId: string) => void }) => {

    return (
        <Card className="border-0 shadow-none">
            <CardContent className="p-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                            src={item.product_image}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product_id.toString(), quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>

                        <span className="w-8 text-center font-medium">{quantity}</span>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product_id.toString(), quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    <div className="text-right min-w-0">
                        <p className="font-semibold text-gray-900">${(item.price * quantity).toFixed(2)}</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                            onClick={() => removeItem(item.product_id.toString())}
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const CartTotal = () => {
    const { totalPrice, totalItems, clearCart, items } = useShoppingCart()
    const tax = totalPrice * 0.08 // 8% tax
    const finalTotal = totalPrice + tax
    const user = useUser()

    const handlePurchase = async () => {
        try {
            toast.loading('Processing your purchase...');

            const response = await fetch('/api/invoices/purchase', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: user?.user_id,
                    items: items.map((item: { product: Product, quantity: number }) => ({
                        product_id: item.product.product_id,
                        quantity: item.quantity,
                    })),
                }),
            })

            const data = await response.json()
            console.log(data)

            if (response.ok) {
                toast.success('Purchase successful!')
                setTimeout(() => {
                    window.location.reload()
                }, 2000)

            } else {
                toast.error('Failed to purchase items')
            }

            clearCart();
        } catch (error) {
            console.error(error)
            toast.error('Failed to purchase items')
        } finally {
            toast.dismiss()
        }
    }

    const handleClearCart = () => {
        clearCart()
        toast.success('Cart cleared')
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-col justify-between gap-4">
                <Button
                    variant="outline"
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </Button>
                <Button
                    onClick={handlePurchase}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3"
                >
                    Complete Purchase
                </Button>
            </div>
        </div>
    )
}

const CheckoutPageModal = ({ children }: { children: React.ReactNode }) => {
    const { items, totalItems, updateQuantity, removeItem } = useShoppingCart()

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-2xl font-bold text-gray-900">Your Order</DialogTitle>
                </DialogHeader>

                <DialogDescription asChild>
                    <div className="flex-1 overflow-hidden">
                        {totalItems === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">🛒</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500">Add some delicious items to get started!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-sm text-gray-600 mb-4">
                                    {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
                                </div>

                                <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                                    {items.map((item) => (
                                        <CartItem key={item.product.product_id} item={item.product} quantity={item.quantity} updateQuantity={updateQuantity} removeItem={removeItem} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogDescription>

                {totalItems > 0 && (
                    <DialogFooter className="pt-6 border-t">
                        <div className="w-full">
                            <CartTotal />
                        </div>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutPageModal