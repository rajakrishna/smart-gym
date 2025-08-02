// import DashboardPageStatCards from '@/components/admin/dashboard/DashboardPageStatCards'
import { ChartAreaInteractive } from '@/components/admin/dashboard/chart-area-interactive'
import { SectionCards } from '@/components/admin/dashboard/section-cards'
import React from 'react'

const page = () => {
    return (
        <div className="container flex flex-col mx-auto py-10 px-4 gap-4">
            <SectionCards />
            <ChartAreaInteractive />
        </div>
    )
}

export default page