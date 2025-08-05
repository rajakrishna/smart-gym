'use client'
import { Card, CardContent } from '@/components/ui/card';
import { TargetRevenue } from '@/types/shared';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

type Props = {
    data: TargetRevenue;
}

export default function TargetRevenueCard({ data }: Props) {
    const { achieved, target } = data;
    const chartData = [
        {name: 'achieved', value: achieved}, 
        {name: 'remaining', value: Math.max(target - achieved, 0)},
    ]
    const COLORS = ['#6b7280', '#e5e7eb']; 

    const percentAchieved = Math.round((achieved / target) * 100);

    return (
        <Card className='w-full'>
            <CardContent className='p-4'>
                <h3 className='text-sm font-medium text-muted-foreground mb-2'>
                    target revenue
                </h3>
                <div className='flex items-center justify-center gap-6 text-sm text-muted-foreground mb-2'>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-gray-700"></span> achieved 
                    </div>
                    <div>
                        <span className="w-3 h-3 rounded-full bg-gray-200"></span> remaining 
                    </div>
                </div>
                <div className="relative flex justify-center items-center h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                innerRadius={60}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                stroke="none"
                            >
                                {chartData.map((_, i) =>(
                                    <Cell key={i} fill={COLORS[i]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <span className="absolute text-2xl font-bold">
                        {percentAchieved}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}