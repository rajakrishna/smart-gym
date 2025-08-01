'use client'

// TODO FIGURE OUT OPTIONS TYPE

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { cafeProductSchema, CreateProductFormData, EditProductFormData } from '@/lib/zod/cafeRelatedSchemas'
import { Product } from '@/types/shared'
import LABELS from '@/constants/labels'

interface CafeProductModalProps {
    children: React.ReactNode
    mode: 'create' | 'edit'
    product?: Product
}

const TextInput = ({ name, label }: { name: string; label: string }) => (
    <FormField name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input {...field} className="h-12" />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
)

const TextAreaInput = ({ name, label }: { name: string; label: string }) => (
    <FormField name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Textarea {...field} className="min-h-[120px] resize-none" />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
)

const NumberInput = ({ name, label, step }: { name: string; label: string; step?: string }) => (
    <FormField name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input
                    type="number"
                    step={step}
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    className="h-12"
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    )} />
)

const SelectInput = ({ name, label, options }: { name: string; label: string; options: { value: string; label: string }[] }) => (
    <FormField name={name} render={({ field }) => (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger className="h-12">
                        <SelectValue />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FormMessage />
        </FormItem>
    )} />
)

const CheckboxInput = ({ name, label }: { name: string; label: string }) => (
    <FormField name={name} render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
                <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="mt-1"
                />
            </FormControl>
            <FormLabel>{label}</FormLabel>
            <FormMessage />
        </FormItem>
    )} />
)

const ActionButtons = ({ isEditMode, onCancel, onDelete, submitText }: {
    isEditMode: boolean
    onCancel: () => void
    onDelete: () => void
    submitText: string
}) => (
    <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
        </Button>
        {isEditMode && (
            <Button type="button" variant="destructive" onClick={onDelete}>
                Deactivate
            </Button>
        )}
        <Button type="submit" className={isEditMode ? 'bg-gray-800 hover:bg-gray-900' : 'bg-green-600 hover:bg-green-700'}>
            {submitText}
        </Button>
    </div>
)

const CafeProductModal = ({ children, mode, product }: CafeProductModalProps) => {
    const [open, setOpen] = useState(false)
    const isEditMode = mode === 'edit'
    const { modal } = LABELS.pages.admin_cafe

    const getDefaultValues = () => {
        if (isEditMode && product) {
            return {
                name: product.name,
                product_description: product.product_description,
                category: product.category,
                product_image: product.product_image || '',
                sku: product.sku,
                quantity: product.quantity,
                min_quantity: product.min_quantity,
                price: product.price,
                restock: product.restock,
                is_active: product.is_active,
            }
        }
        return {
            name: '',
            product_description: '',
            category: 'cafe' as const,
            product_image: '',
            sku: '',
            quantity: 0,
            min_quantity: 5,
            price: 0,
            restock: false,
            is_active: true,
        }
    }

    const form = useForm<CreateProductFormData | EditProductFormData>({
        resolver: zodResolver(cafeProductSchema),
        defaultValues: getDefaultValues(),
    })

    const createProduct = async (data: CreateProductFormData) => {
        const response = await fetch('/api/cafe/items/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to create product')
        }
        return response.json()
    }

    const updateProduct = async (data: EditProductFormData) => {
        const response = await fetch(`/api/cafe/items/edit/${product!.product_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Failed to update product')
        }
        return response.json()
    }

    const deleteProduct = async () => {
        const response = await fetch(`/api/cafe/items/delete/${product!.product_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        return { response, data: await response.json() }
    }

    const handleSubmit = async (data: CreateProductFormData | EditProductFormData) => {
        const toastId = `${mode}-product`

        try {
            toast.loading(
                isEditMode ? modal.toasts.updating : modal.toasts.creating,
                { id: toastId }
            )

            if (isEditMode) {
                await updateProduct(data as EditProductFormData)
            } else {
                await createProduct(data as CreateProductFormData)
            }

            toast.success(
                isEditMode ? modal.toasts.updateSuccess : modal.toasts.createSuccess,
                {
                    id: toastId,
                    description: `${data.name} ${isEditMode ? modal.toasts.updated : modal.toasts.addedToInventory}`
                }
            )
            closeModal()
        } catch (error) {
            toast.error(
                isEditMode ? modal.toasts.updateFailed : modal.toasts.createFailed,
                {
                    id: toastId,
                    description: error instanceof Error ? error.message : `Failed to ${mode} product`
                }
            )
        }
    }

    const handleDelete = async () => {
        if (!isEditMode || !product) return

        try {
            toast.loading(modal.toasts.deactivating, { id: 'delete-product' })
            const { response, data } = await deleteProduct()

            if (!response.ok && response.status === 409) {
                toast.warning(modal.toasts.referencedInOrders, {
                    id: 'delete-product',
                    description: modal.toasts.cannotDelete
                })
                return
            }

            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete product')
            }

            toast.success(modal.toasts.deactivateSuccess, {
                id: 'delete-product',
                description: `${product.name} ${modal.toasts.removedFromInventory}`
            })
            closeModal()
        } catch (error) {
            toast.error(modal.toasts.deactivateFailed, {
                id: 'delete-product',
                description: error instanceof Error ? error.message : 'Failed to delete product'
            })
        }
    }

    const closeModal = () => {
        form.reset()
        setOpen(false)
        window.location.reload()
    }

    const modalConfig = isEditMode ? modal.edit : modal.create

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{modalConfig.title}</DialogTitle>
                    <DialogDescription>{modalConfig.description}</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <TextInput name="name" label={modal.labels.productName} />
                            <TextAreaInput name="product_description" label={modal.labels.description} />
                            <SelectInput name="category" label={modal.labels.category} options={modal.categories as unknown as { value: string; label: string }[]} />
                            <TextInput name="product_image" label={modal.labels.imageUrl} />

                            <div className="grid grid-cols-2 gap-4">
                                <TextInput name="sku" label={modal.labels.sku} />
                                <NumberInput name="quantity" label={modal.labels.stockQuantity} />
                            </div>

                            <NumberInput name="min_quantity" label={modal.labels.minQuantity} />
                            <NumberInput name="price" label={modal.labels.regularPrice} step="0.01" />
                            <CheckboxInput name="restock" label={modal.labels.needsRestock} />
                        </div>

                        <ActionButtons
                            isEditMode={isEditMode}
                            onCancel={closeModal}
                            onDelete={handleDelete}
                            submitText={modalConfig.submitButton}
                        />
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CafeProductModal