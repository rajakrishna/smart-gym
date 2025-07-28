'use client';

import { useState } from 'react';
// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { UpdateClassForm } from '@/components/ui/update-class-form';
import { GetAllClasses } from '@/components/ui/get-all-classes';
import { GetAllCoaches } from '@/components/ui/get-all-coaches';
import { CreateClassForm } from '@/components/ui/create-class-form';

export default function ClassSchedulesPage() {
  const [activeTab, setActiveTab] = useState('coaches');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

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
                <GetAllClasses onSelectClass={setSelectedClassId} />
              </div>

              {/* Right: Class form */}
              <div className="border rounded-xl p-4 space-y-2">
                <h2 className="font-semibold text-lg">Create Class</h2>
                <Separator />
                <CreateClassForm />
                <Separator />
                <h2 className="font-semibold text-lg">Update Class</h2>
                <Separator />
                {selectedClassId ? (
                  <UpdateClassForm classId={selectedClassId} />
                ) : (
                  <p>Select a class to update.</p>
                )}
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
