import Image from 'next/image';
import React from 'react';

export type ClassInfo = {
  src: string;
  name: string;
  coach: string;
  time: string;
};

type ClassCardProps = {
  classInfo: ClassInfo;
  index: number;
};

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, index }) => {
  return (
    <div key={index} className='relative h-[220px] min-w-[160px] rounded-2xl overflow-hidden'>
      {/* Background image */}
      <Image src={classInfo.src} alt={classInfo.name} fill className='object-cover' />

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent'/>

      {/* Text content */}
      <div className='absolute bottom-2 left-2 z-10 text-sm leading-snug text-muted'>
        <h3 className='font-bold  text-xl'>{classInfo.name}</h3>
        <p className='text-sm'>{classInfo.coach}</p>
        <p className='text-sm'>{classInfo.time}</p>
      </div>
    </div>
  );
};

export default ClassCard;
