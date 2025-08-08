import AnalyticsStatCard from "@/components/admin/analytics/AnalyticsStatCard";
import MembershipGrowthCard from "@/components/admin/analytics/MembershipGrowthCard";
import ClassAttendanceCard from "@/components/admin/analytics/ClassAttendanceCard";
import TargetRevenueCard from "@/components/admin/analytics/TargetRevenueCard";
import ActiveGymHoursCard from "@/components/admin/analytics/ActiveGymHoursCard";

import {
    mockStatisticsCards, 
    mockActiveHours, 
    mockMembershipGrowth, 
    mockClassAttendance,
    mockTargetRevenue
} from '@/constants/mockData'

export default function AdminAnalyticsPage(){
    return (
        <div className="space-y-6 p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                { mockStatisticsCards.map((card) => (
                    <AnalyticsStatCard key={card.stat_id} data={card} />
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MembershipGrowthCard data={mockMembershipGrowth}/>
                <ClassAttendanceCard data={mockClassAttendance}/>
                <TargetRevenueCard data={mockTargetRevenue}/>
                <ActiveGymHoursCard data={mockActiveHours}/>
            </div>
        </div>
    )
}