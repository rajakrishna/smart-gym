import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LABELS from '@/constants/labels';
import { Ghost } from 'lucide-react';

const ScheduleCard = () => {
  return (
    <Card className='w-full'>
      <CardContent className=''>
        <div className='flex items-center justify-between'>
          {/* Time */}
          <div className='min-w-[65px]'>{/* {time} */} 7pm</div>

          {/* Class info */}
          <div className='flex flex-col flex-1'>
            <div className='text-base font-bold'>Yoga</div>
            <div className='text-sm text-muted-foreground'>Coach Jill</div>
            <div className='text-sm capitalize text-green-700 pt-2'>Checked-In</div>
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
