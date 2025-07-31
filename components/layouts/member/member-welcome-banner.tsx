import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ICONS from '@/constants/icons'
import LABELS from '@/constants/labels'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ReactBarcode from './ReactBarcode'

const { firstName, imageURL, greeting, profileHref } = LABELS.memberDash

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
        <DialogFooter>
          <Button>
            {LABELS.modals.barCodeModal.scanButton}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const MemberWelcome = () => {
  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
              {firstName}
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
          {/* <Button size="lg"> */}
          <ICONS.member.bellDot />
          {/* </Button> */}
        </div>
      </div>
    </div >

  )
}

export default MemberWelcome

