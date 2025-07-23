'use client';

import LABELS from '@/constants/labels';

const { header, subHeader1, span, subHeader2 } = LABELS.hero;
const Hero = () => {
  return (
    <section
      className='relative h-screen w-full bg-cover bg-center flex items-center justify-center text-muted'
      style={{ backgroundImage: `url('/assets/hero.png')` }}
    >
      <div className='absolute inset-0 bg-black/10 z-0' />

      <div className='relative z-10 text-center max-w-3xl md:px-4 mt-20 md:mt-32'>
        <h1 className='text-[28px] md:text-[58px] font-bold mb-0 md:-mb-2'>{header}</h1>
        <p className='text-md md:text-3xl uppercase font-bold tracking-wide md:tracking-widest'>
          {subHeader1} <span className='text-primary'>{span} </span>
          {subHeader2}
        </p>
      </div>
    </section>
  );
};

export default Hero;
