"use client"

import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { getInitialsForAvatars } from "@/lib/utils"
import LABELS from "@/constants/labels"
import ICONS from "@/constants/icons"
import { User, MessageFormData } from "@/types/shared"

interface SendMessageModalProps {
    children: React.ReactNode
}

const SendMessageModal: React.FC<SendMessageModalProps> = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<MessageFormData>({
        user_id: '',
        type: '',
        title: '',
        body: '',
        category: 'Empty Category',
        delivery_method: ''
    })

    const messageTypes = [
        { value: LABELS.modals.sendMessage.messageTypes.classReminder.value, label: LABELS.modals.sendMessage.messageTypes.classReminder.label },
        { value: LABELS.modals.sendMessage.messageTypes.classCancellation.value, label: LABELS.modals.sendMessage.messageTypes.classCancellation.label },
        { value: LABELS.modals.sendMessage.messageTypes.general.value, label: LABELS.modals.sendMessage.messageTypes.general.label },
        { value: LABELS.modals.sendMessage.messageTypes.administrative.value, label: LABELS.modals.sendMessage.messageTypes.administrative.label },
        { value: LABELS.modals.sendMessage.messageTypes.invoice.value, label: LABELS.modals.sendMessage.messageTypes.invoice.label }
    ]

    const deliveryMethods = [
        { value: LABELS.modals.sendMessage.deliveryMethods.email.value, label: LABELS.modals.sendMessage.deliveryMethods.email.label, icon: ICONS.modals.sendMessage.deliveryMethods.email },
        { value: LABELS.modals.sendMessage.deliveryMethods.sms.value, label: LABELS.modals.sendMessage.deliveryMethods.sms.label, icon: ICONS.modals.sendMessage.deliveryMethods.sms },
        { value: LABELS.modals.sendMessage.deliveryMethods.push.value, label: LABELS.modals.sendMessage.deliveryMethods.push.label, icon: ICONS.modals.sendMessage.deliveryMethods.push }
    ]

    // Fetch users every time the modal is opened
    useEffect(() => {
        if (open) {
            fetchUsers()
        }
    }, [open])

    const fetchUsers = async () => {
        try {

            const response = await fetch('/api/user/getAll')

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`)
            }

            const userData = await response.json()

            if (userData.status === 'ok' && userData.users) {
                setUsers(userData.users)
            } else {
                throw new Error('Invalid response format')
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Unknown error occurred')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.user_id || !formData.title || !formData.body || !formData.type || !formData.delivery_method) {
            toast.error(LABELS.modals.sendMessage.toasts.missingFields)
            return
        }

        setLoading(true)

        try {

            const response = await fetch('/api/messages/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (!response.ok) {
                const errorMessage = result?.error || result?.message || `API request failed with status ${response.status}`
                throw new Error(errorMessage)
            }

            toast.success(LABELS.modals.sendMessage.toasts.success)
            setOpen(false)

            // Reset form
            setFormData({
                user_id: '',
                type: '',
                title: '',
                body: '',
                category: 'Empty Category',
                delivery_method: ''
            })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const getDeliveryMethodBadge = (method: string) => {
        const colors = LABELS.modals.sendMessage.colors.deliveryMethods
        const color = colors[method as keyof typeof colors] || colors.default

        return (
            <Badge className={`${color} text-white`}>
                {deliveryMethods.find(dm => dm.value === method)?.label || method}
            </Badge>
        )
    }

    const selectedUser = users.find(user => user.user_id === formData.user_id)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>


            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <ICONS.modals.sendMessage.send className="h-5 w-5" />
                        {LABELS.modals.sendMessage.title}
                    </DialogTitle>
                    <DialogDescription>
                        {LABELS.modals.sendMessage.description}
                    </DialogDescription>
                </DialogHeader>

                {/* Start of Form */}
                {/* TODO: Should I move this to a separate file? */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Recipients Section */}
                    <div className="space-y-3">
                        <Label htmlFor="recipient" className="text-base font-semibold flex items-center gap-2">
                            <ICONS.modals.sendMessage.users className="h-4 w-4" />
                            {LABELS.modals.sendMessage.labels.recipient}
                        </Label>
                        <Select value={formData.user_id} onValueChange={(value) => setFormData({ ...formData, user_id: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.modals.sendMessage.placeholders.selectRecipient} />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map((user) => (
                                    <SelectItem key={user.user_id} value={user.user_id}>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.full_name}`} />
                                                <AvatarFallback className="text-xs">
                                                    {getInitialsForAvatars(user.full_name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{user.full_name}</div>
                                                <div className="text-sm text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Show selected user info */}
                        {selectedUser && (
                            <div className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://ui-avatars.com/api/?name=${selectedUser.full_name}`} />
                                        <AvatarFallback>
                                            {getInitialsForAvatars(selectedUser.full_name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{selectedUser.full_name}</div>
                                        <div className="text-sm text-muted-foreground">{selectedUser.email}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Subject Section */}
                    <div className="space-y-3">
                        <Label htmlFor="subject" className="text-base font-semibold">
                            {LABELS.modals.sendMessage.labels.subject}
                        </Label>
                        <Input
                            id="subject"
                            placeholder={LABELS.modals.sendMessage.placeholders.enterSubject}
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    {/* Message Type Section */}
                    <div className="space-y-3">
                        <Label htmlFor="messageType" className="text-base font-semibold">
                            {LABELS.modals.sendMessage.labels.messageType}
                        </Label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.modals.sendMessage.placeholders.selectMessageType} />
                            </SelectTrigger>
                            <SelectContent>
                                {messageTypes.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Delivery Method Section */}
                    <div className="space-y-3">
                        <Label htmlFor="deliveryMethod" className="text-base font-semibold">
                            {LABELS.modals.sendMessage.labels.deliveryMethod}
                        </Label>
                        <Select value={formData.delivery_method} onValueChange={(value) => setFormData({ ...formData, delivery_method: value })}>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.modals.sendMessage.placeholders.selectDeliveryMethod} />
                            </SelectTrigger>
                            <SelectContent>
                                {deliveryMethods.map((method) => {
                                    const Icon = method.icon
                                    return (
                                        <SelectItem key={method.value} value={method.value}>
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                {method.label}
                                            </div>
                                        </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>

                        {/* Show selected delivery method */}
                        {formData.delivery_method && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{LABELS.modals.sendMessage.labels.selected}</span>
                                {getDeliveryMethodBadge(formData.delivery_method)}
                            </div>
                        )}
                    </div>

                    {/* Message Body Section */}
                    <div className="space-y-3">
                        <Label htmlFor="body" className="text-base font-semibold">
                            {LABELS.modals.sendMessage.labels.messageBody}
                        </Label>
                        <Textarea
                            id="body"
                            placeholder={LABELS.modals.sendMessage.placeholders.enterMessage}
                            className="min-h-[120px] resize-none"
                            value={formData.body}
                            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                            required
                        />
                        <div className="text-sm text-muted-foreground text-right">
                            {formData.body.length} {LABELS.modals.sendMessage.labels.characters}
                        </div>
                    </div>

                    {/* Cancel and Send Buttons */}
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            {LABELS.modals.sendMessage.buttons.cancel}
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            {loading ? (
                                <>
                                    <ICONS.modals.sendMessage.loader className="h-4 w-4 animate-spin mr-2" />
                                    {LABELS.modals.sendMessage.buttons.sending}
                                </>
                            ) : (
                                <>
                                    <ICONS.modals.sendMessage.send className="h-4 w-4 mr-2" />
                                    {LABELS.modals.sendMessage.buttons.sendMessage}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default SendMessageModal