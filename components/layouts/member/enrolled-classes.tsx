import React from 'react'
import { DataTable } from '@/components/ui/data-table';

export type EnrolledClass = {
  class_id: string;
  booking_status: string;
  waitlisted: boolean;
  joined_at: string;
  class_details: {
    class_name: string;
    category: string;
    scheduled_on: string;
    time: string;
  };
};
const mockEnrolledClasses: EnrolledClass[] = [
  {
    class_id: 'mock-1',
    booking_status: 'confirmed',
    waitlisted: false,
    joined_at: new Date().toISOString(),
    class_details: {
      class_name: 'Mock Yoga Class',
      category: 'Yoga',
      scheduled_on: '2025-08-01',
      time: '14:00:00',
    },
  },
  {
    class_id: 'mock-2',
    booking_status: 'confirmed',
    waitlisted: false,
    joined_at: new Date().toISOString(),
    class_details: {
      class_name: 'Mock Spin Class',
      category: 'Cycling',
      scheduled_on: '2025-08-02',
      time: '10:00:00',
    },
  },
];

async function getData(): Promise<EnrolledClass[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const memberId = '6d5e85b5-060a-48fc-bd16-82902f684b70'; // hardcoded for now, pass this in dynamically

    const response = await fetch(`${baseUrl}/api/user/enrolled/${memberId}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const classes = await response.json();

    if (!Array.isArray(classes) || classes.length === 0) {
      return mockEnrolledClasses;
    }

    return classes;
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
    return mockEnrolledClasses;
  }
}

const data = await getData();

const EnrolledClasses = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Waitlisted</h1>
      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.class_id}
            className="border rounded-lg p-4 shadow-sm bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="text-xl font-semibold">{item.class_details.class_name}</h2>
              <p className="text-gray-600">Category: {item.class_details.category}</p>
              <p className="text-gray-600">
                Scheduled On: {item.class_details.scheduled_on} at {item.class_details.time}
              </p>
              <p className="text-sm text-gray-500">
                Joined: {new Date(item.joined_at).toLocaleString()}
              </p>
              <p className="text-sm text-red-500">
                Status: {item.booking_status}
              </p>
            </div>
            <div className="md:ml-auto">
              <button
                type="button"
                className="mt-2 md:mt-0 px-4 py-2 text-sm rounded bg-muted text-muted-foreground border-muted-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnrolledClasses