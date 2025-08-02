import React from 'react';

import ScheduleCard from './schedule-card';

const labels = {
  title: 'Your Scheduled Classes'
}
const MemberSchedule = () => {
  return (
    <section className='pt-8'>
      <div className='h2 container pb-2'>{labels.title}</div>
      <div className='mx-auto max-w-[1440px] relative flex flex-col '>
        <div className='flex flex-col w-full items-start justify-start gap-4 px-2'>
          <ScheduleCard />
          <ScheduleCard />
        </div>
      </div>
    </section>
  );
};

export default MemberSchedule;
