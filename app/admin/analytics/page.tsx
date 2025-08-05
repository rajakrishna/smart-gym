import AnalyticsStatCard from "@/components/admin/analytics/AnalyticsStatCard";
import MembershipGrowthCard from "@/components/admin/analytics/MembershipGrowthCard";
import ClassAttendanceCard from "@/components/admin/analytics/ClassAttendanceCard";
import TargetRevenueCard from "@/components/admin/analytics/TargetRevenueCard";
import ActiveGymHoursCard from "@/components/admin/analytics/ActiveGymHoursCard";

import {
    AnalyticsStatistic, 
    MembershipGrowth, 
    ClassAttendance, 
    TargetRevenue, 
    ActiveHours
} from '@/types/shared'

const statisticsCards: AnalyticsStatistic[] = [
    {
        stat_id: '1', 
        title: 'totalMembers',
        value: 2400,
        percentage_change: 4.5,
        increase: true, 
        icon_name: 'totalMembers'
    }, 
    {
        stat_id: '2', 
        title: 'revenue',
        value: 42800,
        percentage_change: 2.1,
        increase: false, 
        icon_name: 'revenue'
    }, 
    {
        stat_id: '3', 
        title: 'activeUsers',
        value: 1345,
        percentage_change: -3.2,
        increase: false, 
        icon_name: 'activeUsers'
    }, 
    {
        stat_id: '4', 
        title: 'newUsers',
        value: 98,
        percentage_change: 6.8,
        increase: true, 
        icon_name: 'newUsers'
    }, 
]

const membershipGrowth: MembershipGrowth[] = [
  { month: 'Jan', percentage_growth: 12 },
  { month: 'Feb', percentage_growth: 15 },
  { month: 'Mar', percentage_growth: 18 },
  { month: 'Apr', percentage_growth: 20 },
  { month: 'May', percentage_growth: 14 },
  { month: 'Jun', percentage_growth: 22 },
];

const classAttendance: ClassAttendance[] = [
  { class_type: 'Yoga', visits: 120 },
  { class_type: 'HIIT', visits: 90 },
  { class_type: 'Cycling', visits: 75 },
  { class_type: 'Boxing', visits: 110 },
];

const targetRevenue: TargetRevenue = {
  achieved: 28000,
  target: 42000,
};

const activeHours: ActiveHours[] = [
  { hour: '6 AM', active_users: 45 },
  { hour: '8 AM', active_users: 72 },
  { hour: '10 AM', active_users: 53 },
  { hour: '12 PM', active_users: 95 },
  { hour: '2 PM', active_users: 38 },
  { hour: '4 PM', active_users: 87 },
  { hour: '6 PM', active_users: 102 },
  { hour: '8 PM', active_users: 76 },
];

export default function AdminAnalyticsPage(){
    return (
        <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                { statisticsCards.map((card) => (
                    <AnalyticsStatCard key={card.stat_id} data={card} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MembershipGrowthCard data={membershipGrowth}/>
                <ClassAttendanceCard data={classAttendance}/>
                <TargetRevenueCard data={targetRevenue}/>
                <ActiveGymHoursCard data={activeHours}/>
            </div>
        </div>
    )
}