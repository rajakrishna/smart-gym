'use client';

import React, { useEffect, useState } from 'react';

import { CATEGORY_IMAGE_MAP } from '@/constants/classSchedules';
import { mockDashClasses } from '@/constants/mockData';
import { APIClassData, MockClassData } from '@/types/shared';

import ClassCard, { ClassInfo } from './classCard';
import ClassDetailsModal from './ClassDetailsModal';

const label = {
  heading: 'Upcoming Classes Today',
};

const getImageForCategory = (category: string): string => {
  const key = category.toLowerCase();
  return CATEGORY_IMAGE_MAP[key] || '/assets/gc1.png';
};

const mapMockToClassInfo = (mock: MockClassData): ClassInfo => ({
  id: mock.class_id,
  coach_name: mock.coaches?.first_name || 'Mock',
  time: mock.time,
  src: getImageForCategory(mock.category),
  category: mock.category,
});

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (id: string) => {
    setSelectedClassId(id);
    setModalOpen(true);
  };
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes/memberdash');
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          const mapped: ClassInfo[] = json.data.map((item: APIClassData) => ({
            id: item.class_id,
            coach_name: item.coach_name,
            time: item.time,
            src: item.src || getImageForCategory(item.category),
            category: item.category,
          }));

          if (mapped.length > 0) {
            setClasses(mapped);
            return;
          } else {
            console.warn('API returned empty list. Falling back to mock data.');
          }
        } else {
          console.warn('Unexpected API response. Falling back to mock data.');
        }

        // Fallback to mock data
        setClasses(mockDashClasses.map(mapMockToClassInfo));
      } catch (err) {
        console.error('Error fetching classes:', err);
        setClasses(mockDashClasses.map(mapMockToClassInfo));
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <section className=''>
      <h1 className='h1 container pb-4 text-semibold'>{label.heading}</h1>
      {loading ? (
        <div className='mx-auto max-w-[1440px] relative flex flex-col lg:mb-10 xl:mb-20'>
          <div className='hide-scrollbar flex h-[240px] w-full items-start justify-start gap-4 overflow-x-auto lg:h-[500px] xl:h-[640px] px-1'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className='relative h-[220px] min-w-[160px] rounded-2xl overflow-hidden2bg-gray-300 animate-pulse'
              >
                {/* Simulated image background */}
                <div className='absolute inset-0 bg-gray-300 rounded-2xl' />

                {/* Gradient overlay (static placeholder) */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl' />

                {/* Simulated text content */}
                <div className='absolute bottom-2 left-2 z-10 space-y-2 w-[90%]'>
                  <div className='h-4 w-3/4 bg-gray-500 rounded' />
                  <div className='h-3 w-1/2 bg-gray-500 rounded' />
                  <div className='h-3 w-1/3 bg-gray-500 rounded' />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='mx-auto max-w-[1440px] relative flex flex-col lg:mb-10 xl:mb-20'>
          <div className='hide-scrollbar flex h-[240px] w-full items-start justify-start gap-4 overflow-x-auto lg:h-[500px] xl:h-[640px] px-1'>
            {classes.map((classItem, index) => (
              <ClassCard key={index} classInfo={classItem} index={index} onClick={() => handleOpenModal(classItem.id)} />
            ))}
            {modalOpen && (
              <ClassDetailsModal onClose={() => setModalOpen(false)} isOpen={modalOpen} classId={selectedClassId} />

            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Classes;
