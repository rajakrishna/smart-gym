import Image from 'next/image';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import LABELS from '@/constants/labels';

const { calories } = LABELS.cafeMenu;

export enum CafeItemCategory {
  Drink = 'Drink',
  Bar = 'Portein Bar',
  Snack = 'Snack',
  Cafe = 'Cafe',
}
export type CafeItemInfo = {
  id: string;
  src: string;
  category: CafeItemCategory;
  description: string;
  calories: string;
};

type CafeCardProps = {
  cafeInfo: CafeItemInfo;
  index: number;
};

const CafeCard: React.FC<CafeCardProps> = ({ cafeInfo, index }) => {
  return (
    <Card key={index} className='relative h-[160px] min-w-[120px] overflow-hidden rounded-2xl border-none shadow-md'>
      {/* Background Image */}
      <Image src={cafeInfo.src} alt={cafeInfo.description} fill className='object-cover' />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10' />

      {/* Card Content */}
      <CardContent className='absolute bottom-2 left-2 z-20 text-muted p-0'>
        <p className='text-md font-bold'>{cafeInfo.category}</p>
        <p className='text-[12px]'>
          {calories} {cafeInfo.calories}
        </p>
      </CardContent>
    </Card>
  );
};

export default CafeCard;
