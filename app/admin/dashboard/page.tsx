import DashboardPageStatCards from '@/components/admin/dashboard/DashboardPageStatCards'
import { SectionCards } from '@/components/layouts/admin/section-cards'
import React from 'react'

const page = () => {
    return (
        <div className="container mx-auto py-10 px-4">
            <SectionCards />
            <DashboardPageStatCards />
        </div>
    )
}

export default page