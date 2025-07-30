// TODO: Potentially change the variants of the badges. Currently they are red and grey based off our current theme, but that's not the best for accessibility / design.
// Used className to change the color of the badges for now.
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import React from 'react'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import { Member, CheckInHistory, ClassTaken, Invoice } from '@/types/shared'
import { mockMember, mockCheckInHistory, mockClassesTaken, mockPastInvoices } from '@/constants/mockData'
import EditMemberModal from '@/components/admin/members/modals/EditMemberModal'

// TODO: Add the actual constants from the actual database
interface MemberDetailsCardProps {
    member: Member
}

interface CheckInHistoryCardProps {
    checkInHistory: CheckInHistory[]
}

interface ClassesTakenCardProps {
    classesTaken: ClassTaken[]
}

interface PastInvoicesCardProps {
    invoices: Invoice[]
}

const MemberDetailsCard = ({ member }: MemberDetailsCardProps) => {
    return (
        <Card className="h-[500px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ICONS.user className="w-5 h-5" />
                    {LABELS.pages.admin_member_detail.headers.memberDetails}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={member.image} alt={member.name} />
                        <AvatarFallback className="text-xl">{LABELS.metadata.member.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold text-center">{member.name}</h2>

                    <div className="w-full space-y-3 mt-4">

                        {/* Membership Type */}
                        <div className="flex items-center gap-2">
                            <ICONS.adminMemberDetail.creditCard className="w-4 h-4 text-gray-500" />
                            <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.membershipType}:</span> {member.membershipType}</p>
                        </div>

                        {/* Age */}
                        <div className="flex items-center gap-2">
                            <ICONS.user className="w-4 h-4 text-gray-500" />
                            <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.age}:</span> {member.age}</p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-2">
                            <ICONS.modals.sendMessage.deliveryMethods.email className="w-4 h-4 text-gray-500" />
                            <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.email}:</span> {member.email}</p>
                        </div>

                        {/* Phone # */}
                        <div className="flex items-center gap-2">
                            <ICONS.modals.sendMessage.deliveryMethods.push className="w-4 h-4 text-gray-500" />
                            <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.phone}:</span> {member.phone}</p>
                        </div>

                        {/* Member Since */}
                        <div className="flex items-center gap-2">
                            <ICONS.calendar className="w-4 h-4 text-gray-500" />
                            <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.memberSince}:</span> {member.memberSince}</p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                            <ICONS.adminMemberDetail.sheet className="w-4 h-4" />
                            <p>
                                <span className="font-medium">
                                    {LABELS.pages.admin_member_detail.labels.status}:</span>
                                <Badge variant={member.memberShipStatus === LABELS.pages.admin_member_detail.statuses.active ? 'default' : 'destructive'} className={`ml-2 ${member.memberShipStatus === LABELS.pages.admin_member_detail.statuses.active ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                                    {member.memberShipStatus}
                                </Badge>
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

const CheckInHistoryCard = ({ checkInHistory }: CheckInHistoryCardProps) => {
    return (
        <Card className="h-[500px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ICONS.adminMemberDetail.clock className="w-5 h-5" />
                    {LABELS.pages.admin_member_detail.headers.checkInHistory}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 overflow-hidden">
                <div className="space-y-3 h-full overflow-y-auto">
                    {checkInHistory.map((entry) => (
                        <div key={entry.id} className="flex justify-between items-center p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                                <ICONS.calendar className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-medium">{entry.date}</p>
                                    <p className="text-sm text-gray-600">{entry.time}</p>
                                </div>
                            </div>
                            <Badge variant={entry.status === 'checked-in' ? 'default' : 'destructive'} className={entry.status === 'checked-in' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}>
                                {entry.status === 'checked-in' ? LABELS.pages.admin_member_detail.labels.checkedIn : LABELS.pages.admin_member_detail.labels.checkedOut}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const ClassesTakenCard = ({ classesTaken }: ClassesTakenCardProps) => {
    return (
        <Card className="h-[500px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ICONS.dumbbell className="w-5 h-5" />
                    {LABELS.pages.admin_member_detail.headers.classesTaken}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 overflow-hidden">
                <div className="space-y-3 h-full overflow-y-auto">
                    {classesTaken.map((classItem) => (
                        <div key={classItem.id} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{classItem.className}</h4>
                                <Badge variant={
                                    classItem.status === 'completed' || classItem.status === 'upcoming' ? 'default' : 'destructive'
                                } className={
                                    classItem.status === 'completed' || classItem.status === 'upcoming'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-red-500 hover:bg-red-600'
                                }>
                                    {classItem.status}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <ICONS.user className="w-3 h-3" />
                                {LABELS.pages.admin_member_detail.labels.instructor}: {classItem.instructor}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <ICONS.calendar className="w-3 h-3" />
                                {classItem.date} at {classItem.time}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const PastInvoicesCard = ({ invoices }: PastInvoicesCardProps) => {
    return (
        <Card className="h-[500px]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ICONS.adminMemberDetail.dollarSign className="w-5 h-5" />
                    {LABELS.pages.admin_member_detail.headers.pastInvoices}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 overflow-hidden">
                <div className="space-y-3 h-full overflow-y-auto">
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-medium">#{invoice.invoiceNumber}</h4>
                                    <p className="text-sm text-gray-600">{invoice.description}</p>
                                </div>
                                <Badge variant={
                                    invoice.status === 'paid' ? 'default' : 'destructive'
                                } className={
                                    invoice.status === 'paid'
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-red-500 hover:bg-red-600'
                                }>
                                    {invoice.status}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-600 flex items-center gap-1">
                                    <ICONS.calendar className="w-3 h-3" />
                                    {invoice.date}
                                </p>
                                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}



const MemberDetailPage = () => {
    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">{LABELS.pages.admin_member_detail.headers.memberDetails}</h1>
                <div className="flex gap-2">
                    {/* TODO: Add edit modal */}
                    <EditMemberModal>
                        <Button variant="outline" className="flex items-center gap-2">
                            <ICONS.adminMemberDetail.edit className="w-4 h-4" />
                            {LABELS.pages.admin_member_detail.buttons.edit}
                        </Button>
                    </EditMemberModal>
                    {/* <Button variant="outline" className="flex items-center gap-2 text-red-600 hover:text-red-700">
                        <ICONS.adminMemberDetail.delete className="w-4 h-4" />
                        {LABELS.pages.admin_member_detail.buttons.delete}
                    </Button> */}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left side - Member Details and Past Invoices */}
                <div className="space-y-6">
                    <MemberDetailsCard member={mockMember} />
                    <PastInvoicesCard invoices={mockPastInvoices} />
                </div>

                {/* Right side - Check-in History and Classes */}
                <div className="space-y-6">
                    <CheckInHistoryCard checkInHistory={mockCheckInHistory} />
                    <ClassesTakenCard classesTaken={mockClassesTaken} />
                </div>
            </div>
        </div>
    )
}

export default MemberDetailPage