import React from 'react';
import Image from 'next/image';

const classData = [
  { src: '/assets/gc1.png', name: 'Yoga', coach: 'Coach Jill', time: '1–2pm' },
  { src: '/assets/gc2.png', name: 'Cycling', coach: 'Coach Mike', time: '2–3pm' },
  { src: '/assets/gc3.png', name: 'Boxing', coach: 'Coach Sara', time: '3–4pm' },
  { src: '/assets/gc4.png', name: 'HIIT', coach: 'Coach Ben', time: '4–5pm' },
  { src: '/assets/gc5.png', name: 'Pilates', coach: 'Coach Amy', time: '5–6pm' },
];

const Classes = () => {
  return (
    <section>
      <div>
        <div>
          <h1 className='h1 container'>Classes Today</h1>

          <div className='mx-auto max-w-[1440px] relative flex flex-col lg:mb-10 xl:mb-20'>
            <div className='hide-scrollbar flex h-[240px] w-full items-start justify-start gap-8 overflow-x-auto lg:h-[500px] xl:h-[640px] px-1'>

              {classData.map((cls, index) => (
                <div
                  key={index}
                  className='relative bg-black text-white h-[220px] min-w-[160px] rounded-2xl overflow-hidden'
                >
                  {/* Background image */}
                  <Image
                    src={cls.src}
                    alt={cls.name}
                    fill
                    className='object-cover'
                  />

                  {/* Gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent'></div>

                  {/* Text content */}
                  <div className='absolute bottom-2 left-2 z-10 text-sm leading-snug'>
                    <h3 className='font-bold text-white'>{cls.name}</h3>
                    <p className='text-gray-200'>{cls.coach}</p>
                    <p className='text-gray-300 text-xs'>{cls.time}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classes;
