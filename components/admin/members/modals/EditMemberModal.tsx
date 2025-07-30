import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import LABELS from '@/constants/labels'
import React from 'react'


const EditMemberModal = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{LABELS.modals.editMember.title}</DialogTitle>
                    <DialogDescription>{LABELS.modals.editMember.description}</DialogDescription>
                    <div className="flex flex-col gap-4">
                        {/* Membership Type */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.modals.editMember.placeholders.selectMembershipType} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={LABELS.modals.editMember.membershipTypes.basic.value}>
                                    {LABELS.modals.editMember.membershipTypes.basic.label}
                                </SelectItem>
                                <SelectItem value={LABELS.modals.editMember.membershipTypes.premium.value}>
                                    {LABELS.modals.editMember.membershipTypes.premium.label}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Input type="text" placeholder={LABELS.modals.editMember.placeholders.enterFirstName} />
                        <Input type="text" placeholder={LABELS.modals.editMember.placeholders.enterLastName} />
                        <Input type="email" placeholder={LABELS.modals.editMember.placeholders.enterEmail} />
                        <Input type="tel" placeholder={LABELS.modals.editMember.placeholders.enterPhone} />
                        {/* Membership Status */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder={LABELS.modals.editMember.placeholders.selectMembershipStatus} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={LABELS.modals.editMember.membershipStatuses.active.value}>
                                    {LABELS.modals.editMember.membershipStatuses.active.label}
                                </SelectItem>
                                <SelectItem value={LABELS.modals.editMember.membershipStatuses.inactive.value}>
                                    {LABELS.modals.editMember.membershipStatuses.inactive.label}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default EditMemberModal