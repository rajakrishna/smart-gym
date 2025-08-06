'use client';

import React, { useEffect, useState } from 'react';

import CoachTypeSection from '@/components/class-schedules/CoachTypeSidebarSection';
import {
  AddClassModal,
  AllClassesModal,
  ClassActionModal,
  EditClassModal,
  ViewUsersModal,
} from '@/components/class-schedules/modals';
// import ClassCard from '@/components/class-schedules/ClassCard';
import ClassCard from '@/components/layouts/member/classCard';
import ClassLegend from '@/components/layouts/member/classlegend';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CLASS_TYPES } from '@/constants/classSchedules';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
import { useClassSchedules } from '@/hooks/useClassSchedules';
import type { Coach } from '@/types/shared';

const MONTH_NAMES = [
  LABELS.classSchedules.page.months.january,
  LABELS.classSchedules.page.months.february,
  LABELS.classSchedules.page.months.march,
  LABELS.classSchedules.page.months.april,
  LABELS.classSchedules.page.months.may,
  LABELS.classSchedules.page.months.june,
  LABELS.classSchedules.page.months.july,
  LABELS.classSchedules.page.months.august,
  LABELS.classSchedules.page.months.september,
  LABELS.classSchedules.page.months.october,
  LABELS.classSchedules.page.months.november,
  LABELS.classSchedules.page.months.december,
] as const;
function getImageForCategory(category: string) {
  switch (category.toLowerCase()) {
    case 'hiit':
      return '/assets/gcwide3.png';
    case 'yoga':
      return '/assets/gcwide1.png';
    case 'boxing':
      return '/assets/gcwide4.png';
    case 'aquatic':
      return '/assets/gcwide5.png';
    case 'cycling':
      return '/assets/gcwide2.png';
    default:
      return '/assets/default-class.jpg';
  }
}

const ClassSchedulesPage = () => {
  const {
    currentMonth,
    selectedDate,
    dialogs,
    classForm,
    setClassForm,
    filteredClasses,
    fetchClasses,
    handleDateSelect,
    handleMonthChange,
    goToToday,
    openDialog,
    openAddDialog,
    openClassActionDialog,
    openViewUsersDialog,
    closeDialog,
    handleKeepClass,
    handleCancelClass,
    handleViewUsers,
  } = useClassSchedules();

  const activeTab = MONTH_NAMES[currentMonth.getMonth()];
  const [coaches, setCoaches] = useState<Coach[]>([]);

  // Fetch coaches from API
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch('/api/coaches/getAll');
        const data = await res.json();

        if (Array.isArray(data)) {
          setCoaches(data);
        } else {
          console.error('Unexpected response for coaches:', data);
        }
      } catch (err) {
        console.error('Error fetching coaches:', err);
      }
    };

    fetchCoaches();
  }, []);

  // Helper function to filter coaches by type (case-insensitive)
  const getCoachesByType = (classType: string): Coach[] => {
    return coaches.filter(coach => coach.coach_type?.toLowerCase() === classType.toLowerCase());
  };

  return (
    <SidebarProvider>
      <div className='container mx-auto mt-4'>
        {/* Month Tabs */}

        <div className='bg-white rounded-lg p-6 min-h-[600px]'>
          {/* <ClassLegend /> */}
          <div className='flex flex-col gap-6'>
            <div className='flex gap-6'>
              {/* Class Legend */}

              {/* Calendar */}
              <div className='flex-1 flex flex-col justify-center items-center'>
                <Card className='w-fit py-4'>
                  <CardContent className='px-4'>
                    <Calendar
                      mode='single'
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      month={currentMonth}
                      onMonthChange={month => handleDateSelect(month)}
                      className='bg-transparent p-0 [--cell-size:--spacing(12)] md:[--cell-size:--spacing(14)]'
                      buttonVariant='ghost'
                      required
                    />
                  </CardContent>
                </Card>
                <Button onClick={goToToday} variant='outline' className='flex gap-2 items-center mt-4'>
                  <ICONS.classSchedules.calendar className='w-4 h-4' />
                  {LABELS.classSchedules.page.calendar.goToToday}
                </Button>
              </div>
            </div>

            {/* Classes Section */}
            <div className='border-t pt-6'>
              <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <h3 className='text-lg font-semibold'>
                      {LABELS.classSchedules.page.classes.title}{' '}
                      {selectedDate?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h3>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((cls, index) => {
                      // console.log('Class object:', cls);

                      return (
                        <ClassCard
                          key={cls.class_id}
                          classInfo={{
                            id: cls.class_id,
                            src: getImageForCategory(cls.category),
                            category: cls.category,
                            coach_name: `${cls.coaches.first_name} ${cls.coaches.last_name}`,
                            time: cls.time,
                          }}
                          index={index}
                        />
                      );
                    })
                  ) : (
                    <div className='col-span-full text-center text-muted-foreground py-8'>
                      {LABELS.classSchedules.page.classes.noClasses}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <AllClassesModal isOpen={dialogs.allClasses} onClose={() => closeDialog('allClasses')} />

        <EditClassModal
          isOpen={dialogs.editClass}
          onClose={() => closeDialog('editClass')}
          selectedDate={selectedDate}
          classForm={classForm}
          setClassForm={setClassForm}
          availableClasses={filteredClasses}
          classTypes={CLASS_TYPES}
          fetchClasses={fetchClasses}
        />

        <AddClassModal
          isOpen={dialogs.addClass}
          onClose={() => closeDialog('addClass')}
          selectedDate={selectedDate}
          classForm={classForm}
          setClassForm={setClassForm}
          classTypes={CLASS_TYPES}
        />

        <ClassActionModal
          isOpen={dialogs.classAction.isOpen}
          onClose={() => closeDialog('classAction')}
          classTitle={dialogs.classAction.classTitle}
          onKeep={handleKeepClass}
          onCancel={handleCancelClass}
        />

        <ViewUsersModal
          isOpen={dialogs.viewUsers.isOpen}
          onClose={() => closeDialog('viewUsers')}
          classTitle={dialogs.viewUsers.classTitle}
          onViewUsers={handleViewUsers}
          classId={dialogs.viewUsers.classId}
        />
      </div>
    </SidebarProvider>
  );
};

export default ClassSchedulesPage;
