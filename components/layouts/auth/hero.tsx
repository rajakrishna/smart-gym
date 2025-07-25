'use client';

import { Button } from '@/components/ui/button';
import LABELS from '@/constants/labels';
import { CirclePlay } from 'lucide-react';

const { header, subHeader1, span, subHeader2, button1, button2, button3, href1, href2, href3 } = LABELS.hero;

const { value1, value2, value3, value4, label1, label2, label3, label4 } = LABELS.marquee;
const Hero = () => {
  const MarqueeItem = ({ value, label }: { value: string; label: string }) => (
    <div className='flex flex-col items-center min-w-[12rem]'>
      <span className='text-3xl md:text-4xl font-bold drop-shadow-marquee'>{value}</span>
      <p className='text-sm md:text-xl text-black drop-shadow-marquee'>{label}</p>
    </div>
  );

  return (
<section
      className='relative w-full min-h-screen bg-cover bg-center text-muted'
      style={{ backgroundImage: `url('/assets/hero.png')` }}
    >
      {/* Dark overlay */}
      <div className='absolute inset-0 bg-black/10 z-0' />

      {/* Content container */}
      <div className='relative z-10 flex flex-col items-center text-center px-4 pb-10 pt-[50vh]'>
        
        <h1 className='text-[28px] md:text-[58px] font-bold mb-0 md:-mb-2'>{header}</h1>
        <p className='text-md md:text-3xl uppercase font-bold tracking-wide md:tracking-widest'>
          {subHeader1} <span className='text-primary'>{span}</span> {subHeader2}
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

        {/* Marquee */}
        <div className='w-screen mt-8 overflow-hidden bg-primary py-4'>
          <div className='animate-marquee marquee-track text-black text-2xl flex gap-20 whitespace-nowrap'>
            {[...Array(3)].flatMap(() => [
              <MarqueeItem key={`1-${Math.random()}`} value={value1} label={label1} />,
              <MarqueeItem key={`2-${Math.random()}`} value={value2} label={label2} />,
              <MarqueeItem key={`3-${Math.random()}`} value={value3} label={label3} />,
              <MarqueeItem key={`4-${Math.random()}`} value={value4} label={label4} />,
            ])}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
