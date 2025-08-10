'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types/shared';
import { toast } from 'sonner';

export interface CartItem {
    product: Product;
    quantity: number;
}

const ShoppingCartContext = createContext<{
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (productId: string) => number;
} | undefined>(undefined);

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    // Load saved cart from browser storage when component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Failed to load saved cart:', error);
            }
        }
        // Mark that we've attempted to load from storage so we don't keep trying to load from storage
        setHasLoadedFromStorage(true);
    }, []);

    // Save cart to browser storage whenever items change (but only after initial load)
    useEffect(() => {
        if (hasLoadedFromStorage) {
            localStorage.setItem('shopping-cart', JSON.stringify(items));
        }
    }, [items, hasLoadedFromStorage]);

    const addItem = (product: Product, quantity = 1) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.product.product_id === product.product_id);

            if (existingItem) {
                toast.success(`🛒 Added ${quantity} more ${product.name} to cart ✅`);
                return currentItems.map(item =>
                    item.product.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                toast.success(`🛒 ${product.name} added to cart ✅`);
                return [...currentItems, { product, quantity }];
            }
        });
    };

    const removeItem = (productId: string) => {
        setItems(currentItems => {
            const itemToRemove = currentItems.find(item => item.product.product_id === productId);
            if (itemToRemove) {
                toast.success(`🛒 ${itemToRemove.product.name} removed from cart ✅`);
            }
            return currentItems.filter(item => item.product.product_id !== productId);
        });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }

        setItems(currentItems =>
            currentItems.map(item =>
                item.product.product_id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        toast.success('🛒 Cart cleared ✅');
    };

    const toggleCart = () => setIsOpen(!isOpen);
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // Helper function to get quantity of a specific item
    const getItemQuantity = (productId: string): number => {
        const item = items.find(item => item.product.product_id === productId);
        return item ? item.quantity : 0;
    };

    const contextValue = {
        items,
        totalItems,
        totalPrice,
        isOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        getItemQuantity,
    };

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (!context) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
}
