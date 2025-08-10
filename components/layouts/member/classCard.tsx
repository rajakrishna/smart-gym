import Image from 'next/image';
import React from 'react';
import LABELS from '@/constants/labels';

const {coach} = LABELS.memberClasses

export type ClassInfo = {
  id: string;
  src: string;
  category: string;
  coach_name: string;
  time: string;
};

type ClassCardProps = {
  classInfo: ClassInfo;
  index: number;
  onClick?: (id:string)=>void;
};

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, index, onClick }) => {
  console.log('ClassInfo', classInfo)
  function formatCategory(category: string) {
  if (!category) return '';
  if (category.toLowerCase() === 'hiit') return 'HIIT';
  return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
}

  return (
    <div key={index} className='relative h-[220px] min-w-[160px] rounded-2xl overflow-hidden' onClick={()=> onClick?.(classInfo.id)}>
      {/* Background image */}
      <Image src={classInfo.src} alt={classInfo.category} fill className='object-cover' />

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent'/>

      {/* Text content */}
      <div className='absolute bottom-2 left-2 z-10 text-sm leading-snug text-muted'>
        <h3 className='font-bold  text-xl'>{formatCategory(classInfo.category)}</h3>
        <p className='text-sm'>{coach} {classInfo.coach_name}</p>
        <p className='text-sm'>{classInfo.time}</p>
      </div>
    </div>
  );
};

export default ClassCard;
