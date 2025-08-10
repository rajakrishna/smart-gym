import React from 'react';
import CafeCard, { CafeItemInfo, CafeItemCategory } from './cafe-card';
import LABELS from '@/constants/labels';

const { header } = LABELS.cafeMenu

const cafeItemData: CafeItemInfo[] = [
  { id: "1", src: '/assets/cf1.png', category: CafeItemCategory.Drink, description: 'Oikos Vanilla Smooth', calories: '420' },
  { id: "2", src: '/assets/cf2.png', category: CafeItemCategory.Bar, description: 'Think! Peanut Butter Bar', calories: '300' },
  { id: "3", src: '/assets/cf3.png', category: CafeItemCategory.Snack, description: 'Archer Beef Jerky', calories: '180' },
  { id: "4", src: '/assets/cf4.png', category: CafeItemCategory.Drink, description: 'Gatorade', calories: '80' },
  { id: "5", src: '/assets/cf5.png', category: CafeItemCategory.Snack, description: 'Sargeant String Cheese', calories: '160' },
  { id: "6", src: '/assets/cf6.png', category: CafeItemCategory.Cafe, description: 'Mixed Salad', calories: '350' },
];

const CafeMenu: React.FC = () => {
  return (
    <section>
      <div className='h2 container text-semibold pb-4'>{header}</div>
      <div className='mx-auto max-w-[1440px] relative flex flex-col '>
        <div className='hide-scrollbar flex h-[160px] w-full items-start justify-start gap-4 overflow-x-auto lg:h-[500px] xl:h-[640px] px-1'>
          {cafeItemData.map((cafeInfo, index) => (
            <CafeCard key={index} cafeInfo={cafeInfo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CafeMenu;
