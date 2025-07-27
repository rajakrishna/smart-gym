'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { EditClassForm } from '@/components/ui/edit-class-form';
import { GetAllClasses } from '@/components/ui/get-all-classes';
import { GetAllCoaches } from '@/components/ui/get-all-coaches';

export default function ClassSchedulesPage() {
  const [activeTab, setActiveTab] = useState('coaches');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Class Schedules</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="coaches">View Coaches</TabsTrigger>
          <TabsTrigger value="classes">Class Scheduler</TabsTrigger>
          <TabsTrigger value="bookings">View Class Bookings</TabsTrigger>
        </TabsList>

        <TabsContent value="coaches">
          <Card>
            <CardHeader className="text-xl font-semibold">All Coaches</CardHeader>
            <CardContent>
              {/* TODO: Replace with coach list component */}
              <GetAllCoaches />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <Card>
            <CardHeader className="text-xl font-semibold">Schedule a Class</CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Class list */}
              <div className="border rounded-xl p-4 space-y-2">
                <h2 className="font-semibold text-lg">All Classes</h2>
                <Separator />
                {/* TODO: Replace with dynamic class list */}
                <GetAllClasses />
              </div>

              {/* Right: Class form */}
              <div className="border rounded-xl p-4 space-y-4">
                <h2 className="font-semibold text-lg">Edit Class</h2>
                <Separator />
                <EditClassForm classId={''} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader className="text-xl font-semibold">Class Bookings</CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-xl p-4">
                <h2 className="font-semibold">Filter Bookings by Date</h2>
                {/* TODO: Add date picker and filters */}
              </div>
              <div className="border rounded-xl p-4">
                <h2 className="font-semibold">Joined Members</h2>
                {/* TODO: Show booking table with status and joined time */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}