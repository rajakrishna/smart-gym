import React from 'react';
import { CLASS_TYPE_COLORS, CLASS_TYPES } from '@/constants/classSchedules';
import { getClassColors } from '@/lib/classScheduleUtils';
import type { ClassType } from '@/types/shared';

const ClassLegend: React.FC = () => {
  return (
    <section className="mb-8">
      <h1 className="text-lg font-semibold mb-2">Class Legend</h1>
      <ul className="flex flex-wrap gap-3">
        {CLASS_TYPES.map((classType) => {
          const colors = getClassColors(classType);
          return (
            <li key={classType} className="flex items-center gap-3 px-3">
              <span className={`w-4 h-4 rounded-full ${colors.dot}`} />
              <span className={`text-sm font-medium ${colors.badge} px-2 py-1 rounded border`}>
                {classType}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ClassLegend;