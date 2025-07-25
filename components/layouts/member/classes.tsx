import React from 'react';

import ClassCard from './classCard';
import { ClassInfo } from './classCard';

const classData: ClassInfo[] = [
  { src: '/assets/gc1.png', name: 'Yoga', coach: 'Coach Jill', time: '7–8am' },
  { src: '/assets/gc2.png', name: 'Cycling', coach: 'Coach Mike', time: '9–10am' },
  { src: '/assets/gc3.png', name: 'Boxing', coach: 'Coach Sara', time: '4–5pm' },
  { src: '/assets/gc5.png', name: 'HIIT', coach: 'Coach Ben', time: '4–5pm' },
  { src: '/assets/gc5.png', name: 'HIIT', coach: 'Coach Amy', time: '5–6pm' },
];

const Classes: React.FC = () => {
  return (
    <section className=''>
          <h1 className='h1 container'>Upcoming Classes Today</h1>
          <div className='mx-auto max-w-[1440px] relative flex flex-col lg:mb-10 xl:mb-20'>
            <div className='hide-scrollbar flex h-[240px] w-full items-start justify-start gap-4 overflow-x-auto lg:h-[500px] xl:h-[640px] px-1'>
              {classData.map((classItem, index) => (
                <ClassCard key={index} classInfo={classItem} index={index} />
              ))}
            </div>
          </div>
    </section>
  );
};

export default Classes;
