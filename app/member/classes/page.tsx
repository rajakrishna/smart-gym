'use client';

import React, { useState } from 'react';

import ClassCard from '@/components/layouts/member/classCard';
import ClassDetailsModal from '@/components/layouts/member/ClassDetailsModal';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { SidebarProvider } from '@/components/ui/sidebar';
import ICONS from '@/constants/icons';
import LABELS from '@/constants/labels';
import { useClassSchedules } from '@/hooks/useClassSchedules';

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
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (id: string) => {
    setSelectedClassId(id);
    setModalOpen(true);
  };

  const {
    currentMonth,
    selectedDate,
    filteredClasses,
    handleDateSelect,
    goToToday,
  } = useClassSchedules();

  return (
    <SidebarProvider>
      <div className='container mx-auto mt-4'>
        {/* Month Tabs */}

        <div className='bg-white rounded-lg p-6 min-h-[600px]'>
          <div className='flex flex-col gap-6'>
            <div className='flex gap-6'>
              {/* Class Legend */}

              {/* Calendar */}
              <div className='flex-1 flex flex-col justify-center items-center'>
                <Card className='w-fit py-4'>
                  <CardContent className='p-0'>
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
                      const formattedTime = new Date(`1970-01-01T${cls.time}Z`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      });

                      return (
                        <ClassCard
                          key={cls.class_id}
                          classInfo={{
                            id: cls.class_id,
                            src: getImageForCategory(cls.category),
                            category: cls.category,
                            coach_name: `${cls.coaches.first_name}`,
                            time: formattedTime,
                          }}
                          index={index}
                          onClick={()=> handleOpenModal(cls.class_id)}
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
        {modalOpen && (
  <ClassDetailsModal
    onClose={() => setModalOpen(false)}
    isOpen={modalOpen}
    classId={selectedClassId}
  />
)}
      </div>
    </SidebarProvider>
  );
};

export default ClassSchedulesPage;
