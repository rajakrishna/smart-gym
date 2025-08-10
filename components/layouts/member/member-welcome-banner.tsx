'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'
import { useUser } from '@/context/user-context'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ReactBarcode from './ReactBarcode'
import CheckoutPageModal from '@/components/members/cafe/modals/CheckoutPageModal'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'

const { imageURL, greeting, profileHref } = LABELS.memberDash

const BarCodeModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {LABELS.modals.barCodeModal.title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {LABELS.modals.barCodeModal.description}
        </DialogDescription>
        <DialogContent>
          <ReactBarcode />
        </DialogContent>
      </DialogContent>
    </Dialog>
  )
}

const MemberWelcome = () => {
  const user = useUser()
  const { items } = useShoppingCart()

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  console.log(user)

  if (!user) return null

  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={profileHref}>
            <Image
              src={imageURL}
              alt="User Profile"
              width={100}
              height={100}
              className="w-14 h-14 rounded-full border-2 border-white shadow-md" />
          </Link>
          <div className="flex flex-col items-start ml-2 justify-center">
            <p className="text-sm tracking-tighter text-gray-600 font-medium">
              {greeting}
            </p>
            <p className="text-lg tracking-widest text-gray-900 font-semibold">
              {user.first_name}
            </p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <Link href={'/'}>
            <ICONS.home />
          </Link>
          <BarCodeModal>
            {/* <Button size="lg"> */}
            <ICONS.member.scanBarcode />
            {/* </Button> */}
          </BarCodeModal>
          <Link href={'/member/messages'}>
            {/* <Button size="lg"> */}
            <ICONS.member.bellDot />
          </Link>
          {/* </Button> */}
          <CheckoutPageModal>
            <div className="relative">
              <ICONS.cart className='w-6 h-6' />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </div>
          </CheckoutPageModal>
        </div>
      </div>
    </div >

  )
}

export default MemberWelcome

