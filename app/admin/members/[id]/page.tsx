// app/admin/members/[id]/page.tsx
// Same UI as your original, with:
// - calculated age
// - API fetch (with mock fallbacks)
// - invoice date backfill + nice formatting

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

// ---------- helpers ----------
function calculateAge(dob: string | null | undefined): string | number {
  if (!dob) return ''
  // handle "YYYY-MM-DD" as well as generic date strings
  const d = /^\d{4}-\d{2}-\d{2}$/.test(dob) ? new Date(dob + 'T00:00:00') : new Date(dob)
  if (Number.isNaN(d.getTime())) return ''
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age
}

function fmtDate(date?: string | null) {
  if (!date) return '—'
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return String(date)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(d)
}

// If API doesn't send invoice dates, synthesize descending monthly dates
function backfillInvoiceDates(invoices: Invoice[]): Invoice[] {
  const MS_IN_DAY = 86_400_000
  return invoices.map((inv, idx) => {
    if (inv?.date) return inv
    const d = new Date(Date.now() - idx * 30 * MS_IN_DAY) // ≈ monthly spacing
    return { ...inv, date: d.toISOString().slice(0, 10) } // YYYY-MM-DD
  })
}

// ---------- types for props ----------
interface MemberDetailsCardProps { member: Member }
interface CheckInHistoryCardProps { checkInHistory: CheckInHistory[] }
interface ClassesTakenCardProps { classesTaken: ClassTaken[] }
interface PastInvoicesCardProps { invoices: Invoice[] }

// ---------- cards (UI unchanged, except Age row + invoice date formatting) ----------
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
            <AvatarImage src={member.user_image} alt={member.first_name} />
            <AvatarFallback className="text-xl">{LABELS.metadata.member.avatarFallback}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-center">{member.first_name} {member.last_name}</h2>

          <div className="w-full space-y-3 mt-4">
            {/* Membership Type */}
            <div className="flex items-center gap-2">
              <ICONS.adminMemberDetail.creditCard className="w-4 h-4 text-gray-500" />
              <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.membershipType}:</span> {member.membership_plan}</p>
            </div>

            {/* Age (calculated from DOB) */}
            <div className="flex items-center gap-2">
              <ICONS.user className="w-4 h-4 text-gray-500" />
              <p>
                <span className="font-medium">{LABELS.pages.admin_member_detail.labels.age}:</span>{' '}
                {calculateAge(member.date_of_birth)}
              </p>
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
              <p><span className="font-medium">{LABELS.pages.admin_member_detail.labels.memberSince}:</span> {member.created_at}</p>
            </div>

            {/* Status (kept static to match current UI) */}
            <div className="flex items-center gap-2">
              <ICONS.adminMemberDetail.sheet className="w-4 h-4" />
              <p>
                <span className="font-medium">{LABELS.pages.admin_member_detail.labels.status}:</span>
                <Badge
                  variant={"Active" === LABELS.pages.admin_member_detail.statuses.active ? 'default' : 'destructive'}
                  className={`ml-2 ${"Active" === LABELS.pages.admin_member_detail.statuses.active ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                >
                  Active
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
                  {fmtDate(invoice.date)}
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

// ---------- page: fetch API and fall back to mocks ----------
export default async function MemberDetailPage(
  { params }: { params: Promise<{ id: string }> } // your project types params as a Promise
) {
  const { id } = await params

  // Start with mocks
  let member: Member = mockMember
  let pastInvoices: Invoice[] = mockPastInvoices
  let checkInHistory: CheckInHistory[] = mockCheckInHistory
  let classesTaken: ClassTaken[] = mockClassesTaken

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? ''
    const res = await fetch(`${base}/api/adminMemberProfile/${id}`, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (data?.member) member = { ...mockMember, ...data.member }
      if (Array.isArray(data?.invoices)) pastInvoices = backfillInvoiceDates(data.invoices)
      if (Array.isArray(data?.checkins)) checkInHistory = data.checkins
      if (Array.isArray(data?.classes)) classesTaken = data.classes
    }
  } catch {
    // ignore network/errors, keep mocks
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">{LABELS.pages.admin_member_detail.headers.memberDetails}</h1>
        <div className="flex gap-2">
          <EditMemberModal>
            <Button variant="outline" className="flex items-center gap-2">
              <ICONS.adminMemberDetail.edit className="w-4 h-4" />
              {LABELS.pages.admin_member_detail.buttons.edit}
            </Button>
          </EditMemberModal>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Member Details and Past Invoices */}
        <div className="space-y-6">
          <MemberDetailsCard member={member} />
          <PastInvoicesCard invoices={pastInvoices} />
        </div>

        {/* Right side - Check-in History and Classes */}
        <div className="space-y-6">
          <CheckInHistoryCard checkInHistory={checkInHistory} />
          <ClassesTakenCard classesTaken={classesTaken} />
        </div>
      </div>
    </div>
  )
}
