'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
import { useUser } from '@/context/user-context';

import ReactBarcode from './ReactBarcode';

const { imageURL, greeting, profileHref } = LABELS.memberDash;

const BarCodeModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='w-[25rem]'>
        <DialogHeader>
          <DialogTitle>{LABELS.modals.barCodeModal.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-center'>{LABELS.modals.barCodeModal.description}</DialogDescription>
          <ReactBarcode />
      </DialogContent>
    </Dialog>

  );
};

const MemberWelcome = () => {
  const user = useUser();
  if (!user) return null;
  return (
    <div className='px-4 py-4 border-b border-gray-100'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link href={profileHref}>
            <Image
              src={imageURL}
              alt='User Profile'
              width={100}
              height={100}
              className='w-14 h-14 rounded-full border-2 border-white shadow-md'
            />
          </Link>
          <div className='flex flex-col items-start ml-2 justify-center'>
            <p className='text-sm tracking-tighter text-gray-600 font-medium'>{greeting}</p>
            <p className='text-lg tracking-widest text-gray-900 font-semibold'>{user.first_name}</p>
          </div>
        </div>
        <div className='flex gap-4 items-center'>
          <BarCodeModal>
            {/* <Button size="lg"> */}
            <ICONS.member.scanBarcode className='hover:cursor-pointer' />
            {/* </Button> */}
          </BarCodeModal>
          <Link href={'/member/messages'}>
            {/* <Button size="lg"> */}
            <ICONS.member.bellDot />
          </Link>
          <Link href={'/'}>
            <ICONS.logOut />
          </Link>
          {/* </Button> */}
        </div>
      </div>
    </div>
  );
};

export default MemberWelcome;
