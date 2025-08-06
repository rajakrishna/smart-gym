import { Card, CardContent } from '@/components/ui/card';
import { ChevronUp, ChevronDown } from 'lucide-react';
import ICONS from '@/constants/icons';
import { AnalyticsStatistic } from '@/types/shared';

type Props = {
  data: AnalyticsStatistic;
};

export default function AnalyticsStatCard({ data }: Props) {
  const Icon = ICONS.adminAnalyticsStats[data.icon_name];

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{data.title}</p>
          <p className="text-2xl font-bold">{data.value.toLocaleString()}</p>
          <p
            className={`text-sm mt-1 font-medium flex items-center gap-1 ${
              data.increase ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {data.increase ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {Math.abs(data.percentage_change)}%
          </p>
        </div>
        {Icon && <Icon className="w-6 h-6 text-muted-foreground" />}
      </CardContent>
    </Card>
  );
}
