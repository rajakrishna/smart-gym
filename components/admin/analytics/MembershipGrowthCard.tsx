'use client';
import { Card, CardContent } from '@/components/ui/card';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    ResponsiveContainer, 
    Tooltip, 
    CartesianGrid, 
    Cell
 } from 'recharts';
import { MembershipGrowth } from '@/types/shared';
import { MEM_GROWTH_CHART_COLORS } from '@/constants/analyticsConstants';

type Props = {
    data: MembershipGrowth[];
}

export default function MembershipGrowthCard({ data }: Props) {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Membership Growth
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} barSize={30}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" type="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="percentage_growth">
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={MEM_GROWTH_CHART_COLORS[index % MEM_GROWTH_CHART_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}