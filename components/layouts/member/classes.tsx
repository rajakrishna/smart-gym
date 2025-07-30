'use client'
import React, {useEffect, useState} from 'react';

import ClassCard from './classCard';
import { ClassInfo } from './classCard';

// const classData: ClassInfo[] = [
//   { id:'1', src: '/assets/gc1.png', category: 'Yoga', coach: 'Jill', time: '7–8am' },
//   { id:'2', src: '/assets/gc2.png', category: 'Cycling', coach: 'Mike', time: '9–10am' },
//   { id:'3', src: '/assets/gc3.png', category: 'Boxing', coach: 'Sara', time: '4–5pm' },
//   { id:'4', src: '/assets/gc5.png', category: 'HIIT', coach: 'Ben', time: '4–5pm' },
//   { id:'5', src: '/assets/gc5.png', category: 'HIIT', coach: 'Amy', time: '5–6pm' },
// ];

const Classes: React.FC = () => {
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes/memberdash');
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {

          const mapped: ClassInfo[] = json.data.map((item: any) => ({
            id: item.class_id,
            name: item.class_name,
            coach: item.coach_name,
            time: item.time,
            src: item.src,
            category: item.category,
          }));

          setClasses(mapped);
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);
  return (
    <section className=''>
          <h1 className='h1 container'>Upcoming Classes Today</h1>
          {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className='mx-auto max-w-[1440px] relative flex flex-col lg:mb-10 xl:mb-20'>
          <div className='hide-scrollbar flex h-[240px] w-full items-start justify-start gap-4 overflow-x-auto lg:h-[500px] xl:h-[640px] px-1'>
            {classes.map((classItem, index) => (
              <ClassCard key={index} classInfo={classItem} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Classes;
