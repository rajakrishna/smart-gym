'use client';
import { Card, CardContent } from '@/components/ui/card';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    ResponsiveContainer, 
    Tooltip, 
    CartesianGrid
 } from 'recharts';
import { MembershipGrowth } from '@/types/shared';

type Props = {
    data: MembershipGrowth[];
}

export default function MembershipGrowthCard({ data }: Props) {
    return (
        <Card className="w-full">
            <CardContent className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    membership growth 
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={ data } barSize={30}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="month" type='category'/>
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percentage_growth" fill="#6b7280" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}