import React from 'react'

import { ChartAreaInteractive } from '@/components/admin/dashboard/chart-area-interactive'
import ClassesToday from '@/components/admin/dashboard/ClassesToday'
import { SectionCards } from '@/components/admin/dashboard/section-cards'
import TopPurchases from '@/components/admin/dashboard/TopCafePurchases'
import RecentMessagesDashboardTable from '@/components/admin/dashboard/recentMessages/recentMessagesDashboardTable'
// import DashboardPageStatCards from '@/components/admin/dashboard/DashboardPageStatCards'

const page = () => {
    return (
        <div className="container flex flex-col mx-auto py-10 px-4 gap-4">
            <SectionCards />
            <ChartAreaInteractive />
            <RecentMessagesDashboardTable />
            <ClassesToday />
            <TopPurchases />
        </div>
    )
}

export default page