'use client';

import { Button } from '@/components/ui/button';
import LABELS from '@/constants/labels';
import { CirclePlay } from 'lucide-react';

const { header, subHeader1, span, subHeader2, button1, button2, button3, href1, href2, href3 } = LABELS.hero;
const Hero = () => {
  return (
    <section
      className='relative h-screen w-full bg-cover bg-center text-muted'
      style={{ backgroundImage: `url('/assets/hero.png')` }}
    >
      <div className='absolute inset-0 bg-black/10 z-0' />

      <div className='relative z-10 h-full flex flex-col'>
        <div className='flex-1' />
        <div className='flex-1 flex flex-col items-center text-center mx-auto'>
          <h1 className='text-[28px] md:text-[58px] font-bold mb-0 md:-mb-2'>{header}</h1>
          <p className='text-md md:text-3xl uppercase font-bold tracking-wide md:tracking-widest'>
            {subHeader1} <span className='text-primary'>{span} </span>
            {subHeader2}
          </p>
          <div className='flex gap-8 pt-4'>
            <Button
              asChild
              variant='outline'
              className='w-[8rem] border-primary border-2 bg-transparent hover:border-white hover:cursor-pointer'
            >
              <a href={href1}>{button1}</a>
            </Button>
            <Button asChild className='w-[8rem] text-black hover:cursor-pointer'>
              <a href={href2}>{button2}</a>
            </Button>
          </div>

          <div className='pt-4'>
            <Button asChild className='bg-transparent text-xl hover:cursor-pointer hover:bg-transparent'>
              <a href={href3}>
                <CirclePlay className='w-10 h-10' />
                {button3}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
