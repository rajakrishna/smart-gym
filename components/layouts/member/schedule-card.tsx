import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

const cardLabels = {
  time:'7pm',
  class:'Yoga',
  coach: 'Coach Jill',
  status: 'Checked-In'
}

const ScheduleCard = () => {
  return (
    <Card className='w-full'>
      <CardContent className=''>
        <div className='flex items-center justify-between'>
          {/* Time */}
          <div className='min-w-[65px]'>{/* {time} */} {cardLabels.time}</div>

          {/* Class info */}
          <div className='flex flex-col flex-1'>
            <div className='text-base font-bold'>{cardLabels.class}</div>
            <div className='text-sm text-muted-foreground'>{cardLabels.coach}</div>
            <div className='text-sm capitalize text-green-700 pt-2'>{cardLabels.status}</div>
          </div>

          {/* Cancel button */}
          <div>
            <Button variant='outline' size='sm' className='bg-muted text-muted-foreground'>
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
