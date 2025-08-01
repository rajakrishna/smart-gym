import React from 'react';

import { MemberProfileItem } from '@/types/shared';
import { ChevronRight } from 'lucide-react';

type Props = {
  items: MemberProfileItem[];
};

export default function MemberProfileCard({ items }: Props) {
  return (
    <div className='flex flex-col gap-y-3 px-4 pt-2'>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className='flex items-center justify-between text-gray-800'>
            <div className='flex items-center gap-3 my-2'>
              <Icon className='w-5 h-5 text-muted-foreground' />
              <span className='text-sm'>{item.label}</span>
            </div>
            <ChevronRight className='w-4 h-4 text-gray-400' />
          </div>
        );
      })}
    </div>
  );
}
