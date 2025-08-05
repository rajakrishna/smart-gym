'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { ActiveHours } from '@/types/shared';

type Props = {
  data: ActiveHours[];
};

export default function ActiveGymHoursCard({ data }: Props) {
  const max = Math.max(...data.map((d) => d.active_users));

  const getGrayShade = (ratio: number) => {
    if (ratio >= 0.75) return '#374151'; 
    if (ratio >= 0.5) return '#6b7280';  
    if (ratio >= 0.25) return '#9ca3af'; 
    return '#e5e7eb';                   
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          most active gym hours
        </h3>

        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-700"></span> very active
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500"></span> active 
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-400"></span> less active
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200"></span> inactive
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            {data.map((entry, i) => {
              const ratio = entry.active_users / max;
              const fill = getGrayShade(ratio);
              const outerRadius = 50 + ratio * 30; // slices "stick out" more if active
              const angle = 360 / data.length;

              return (
                <Pie
                  key={`pie-${i}`}
                  data={[entry]}
                  dataKey="active_users"
                  nameKey="hour"
                  cx="50%"
                  cy="50%"
                  startAngle={i * angle}
                  endAngle={(i + 1) * angle}
                  innerRadius={20}
                  outerRadius={outerRadius}
                  isAnimationActive={false}
                  stroke="none"
                >
                  <Cell fill={fill} />
                </Pie>
              );
            })}
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
