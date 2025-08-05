'use client'

import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from 'recharts';
import { ClassAttendance } from "@/types/shared";

type Props = {
    data: ClassAttendance[];
}

export default function ClassAttendanceCard({ data }: Props) {
    return (
        <Card className="w-full">
            <CardContent className="p-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    class attendance
                </h3>
                <ResponsiveContainer width="100%" height={data.length * 50 }>
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis type="number"/>
                        <YAxis
                            dataKey="class_type"
                            type="category"
                            tick={{ fontSize: 12 }}
                            width={80}
                        />
                        <Tooltip/>
                        <Bar
                            dataKey="visits"
                            fill="#6b7280"
                            radius={[0, 4, 4, 0]}
                            barSize={24}
                        >
                            <LabelList dataKey="visits" position="right"/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}