import React from 'react';
import { mockEnrolledClasses } from '@/constants/mockData';
import { EnrolledBooking } from '@/types/shared';
import LABELS from '@/constants/labels';
import EnrolledCard from './enrolled-card';

async function getEnrolledClasses(memberId: string): Promise<EnrolledBooking[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/user/enrolled/${memberId}`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
    return mockEnrolledClasses;
  }
}

const EnrolledClasses = async ({ memberId }: { memberId: string }) => {
  const classes = await getEnrolledClasses(memberId);
  const waitlistedClasses = classes.filter(c => c.waitlisted);
  const confirmedClasses = classes.filter(c => !c.waitlisted);

  return (
    <div className='container mx-auto py-10 px-4'>
      {waitlistedClasses.length > 0 && (
        <>
          <h1 className='text-2xl font-bold mb-4'>{LABELS.memberDash.schedule.waitlistHead}</h1>
          <div className='space-y-4 mb-8'>
            {waitlistedClasses.map(item => (
              <EnrolledCard key={`${item.class_id} -${item.joined_at}`} item={item} isWaitlisted />
            ))}
          </div>
        </>
      )}

      <h1 className='text-xl font-bold mb-4'>{LABELS.memberDash.schedule.scheduleHead}</h1>
      {confirmedClasses.length > 0 ? (
        <div className='space-y-4'>
          {confirmedClasses.map(item => (
            <EnrolledCard key={`${item.class_id} -${item.joined_at}`} item={item} />
          ))}
        </div>
      ) : (
        <p className='text-gray-500'>{LABELS.memberDash.schedule.noReturns}</p>
      )}
    </div>
  );
};

export default EnrolledClasses;
