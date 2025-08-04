import React from 'react'
import { Button } from '@/components/ui/button'
import { EnrolledBooking } from '@/types/shared'
import LABELS from '@/constants/labels'

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const formatTime = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
  });
};

export const EnrolledCard = ({
  item,
  isWaitlisted = false,
}: {
  item: EnrolledBooking;
  isWaitlisted?: boolean;
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex items-center">
      <div className="flex-shrink-0 w-14 text-center">
        <p className="text-sm">{formatDate(item.class_details.scheduled_on)}</p>
        <p>{formatTime(item.class_details.time)}</p>
      </div>

      <div className="flex-1 px-4">
        <h2 className="text-lg font-semibold">{item.class_details.class_name}</h2>
        <p className="text-gray-600 capitalize mb-1">{item.class_details.category}</p>
        {isWaitlisted ? (
          <p className="text-sm text-yellow-600">{LABELS.memberDash.schedule.status1}</p>
        ) : (
          <p className="text-sm text-green-700">{LABELS.memberDash.schedule.status2}</p>
        )}
      </div>

      <div className="flex-shrink-0 w-24 flex justify-center">
        <Button variant="secondary" className="border h-10 my-auto text-muted-foreground">
          {LABELS.memberDash.schedule.button}
        </Button>
      </div>
    </div>
  );
};
export default EnrolledCard