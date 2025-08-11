import React from 'react';
import { mockEnrolledClasses } from '@/constants/mockData';
import { EnrolledBooking } from '@/types/shared';
import EnrolledClassesClient from './enrolled-classes-client';

async function getEnrolledClasses(memberId: string): Promise<EnrolledBooking[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/user/enrolled/${memberId}`, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Error fetching enrolled classes:', e);
    return mockEnrolledClasses;
  }
}

export default async function EnrolledClasses({ memberId }: { memberId: string }) {
  const classes = await getEnrolledClasses(memberId);
  return (
    <EnrolledClassesClient
      initialClasses={classes}
      memberId={memberId}
      baseUrl={process.env.NEXT_PUBLIC_BASE_URL}
    />
  );
}
