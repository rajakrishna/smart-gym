import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

// TODO: Finish the edit member modal
// TODO: Add the placeholders, should be the current values of the member
// TODO: Add the form and the submit button
// TODO: Add the API call to update the member

const EditMemberModal = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Member</DialogTitle>
                    <DialogDescription>Edit the member&apos;s details</DialogDescription>
                    <div className="flex flex-col gap-4">
                        {/* Membership Type */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Membership Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="basic">Basic</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input type="text" placeholder="First Name" />
                        <Input type="text" placeholder="Last Name" />
                        <Input type="email" placeholder="Email" />
                        <Input type="tel" placeholder="Phone" />
                        {/* Membership Status */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Membership Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditMemberModal