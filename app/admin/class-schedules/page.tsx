'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarProvider } from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { AddClassModal, ClassActionModal } from '@/components/class-schedules/modals'
import CoachTypeSection from '@/components/class-schedules/CoachTypeSidebarSection'
import ClassCard from '@/components/class-schedules/ClassCard'
import { useClassSchedules } from '@/hooks/useClassSchedules'
import { COACHES, CLASS_TYPES } from '@/constants/classSchedules'

import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'
import { ViewUsersModal } from '@/components/class-schedules/modals'

const MONTH_NAMES = [
    LABELS.classSchedules.page.months.january,
    LABELS.classSchedules.page.months.february,
    LABELS.classSchedules.page.months.march,
    LABELS.classSchedules.page.months.april,
    LABELS.classSchedules.page.months.may,
    LABELS.classSchedules.page.months.june,
    LABELS.classSchedules.page.months.july,
    LABELS.classSchedules.page.months.august,
    LABELS.classSchedules.page.months.september,
    LABELS.classSchedules.page.months.october,
    LABELS.classSchedules.page.months.november,
    LABELS.classSchedules.page.months.december,
] as const


const ClassSchedulesPage = () => {
    const {
        currentMonth,
        selectedDate,
        dialogs,
        classForm,
        setClassForm,
        filteredClasses,
        handleDateSelect,
        handleMonthChange,
        goToToday,
        openAddDialog,
        openClassActionDialog,
        openViewUsersDialog,
        closeDialog,
        handleAddClass,
        handleDeleteClass,
        handleCancelClass,
        handleViewUsers,
    } = useClassSchedules()

    const activeTab = MONTH_NAMES[currentMonth.getMonth()]
    const coachGroups = COACHES.reduce((groups, coach) => {
        if (!groups[coach.type]) groups[coach.type] = [];
        groups[coach.type].push(coach);
        return groups;
    }, {} as Record<string, typeof COACHES[0][]>)

    return (
        <SidebarProvider>
            <div className='container mx-auto'>
                {/* Month Tabs */}
                <Tabs className='w-full flex justify-center items-center mb-4 mt-4' value={activeTab} onValueChange={handleMonthChange}>
                    <TabsList className='flex gap-2'>
                        {MONTH_NAMES.map(month => (
                            <TabsTrigger key={month} value={month}>{month}</TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                <div className='bg-white rounded-lg border shadow-sm p-6 min-h-[600px]'>
                    <div className='flex flex-col gap-6'>
                        <div className='flex gap-6'>
                            {/* Coaches Sidebar */}
                            <div className='w-80 flex-shrink-0'>
                                <SidebarContent className="h-[500px]">
                                    <SidebarGroup className='p-4 h-full flex flex-col'>
                                        <SidebarGroupLabel className='text-lg font-semibold text-gray-900 mb-4 flex-shrink-0'>
                                            {LABELS.classSchedules.page.sidebar.coaches}
                                        </SidebarGroupLabel>
                                        <SidebarGroupContent className='space-y-4 overflow-y-auto flex-1 pr-2'>
                                            {Object.entries(coachGroups).map(([classType, coaches]) => (
                                                <CoachTypeSection
                                                    key={classType}
                                                    classType={classType}
                                                    coaches={coaches}
                                                />
                                            ))}
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                </SidebarContent>
                            </div>

                            {/* Calendar */}
                            <div className='flex-1 flex flex-col justify-center items-center'>
                                <Card className="w-fit py-4">
                                    <CardContent className="px-4">
                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={handleDateSelect}
                                            month={currentMonth}
                                            onMonthChange={(month) => handleDateSelect(month)}
                                            className="bg-transparent p-0 [--cell-size:--spacing(12)] md:[--cell-size:--spacing(14)]"
                                            buttonVariant="ghost"
                                            required
                                        />
                                    </CardContent>
                                </Card>
                                <Button onClick={goToToday} variant="outline" className='flex gap-2 items-center mt-4'>
                                    <ICONS.classSchedules.calendar className='w-4 h-4' />
                                    {LABELS.classSchedules.page.calendar.goToToday}
                                </Button>
                            </div>
                        </div>

                        {/* Classes Section */}
                        <div className='border-t pt-6'>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-lg font-semibold">
                                            {LABELS.classSchedules.page.classes.title} {selectedDate?.toLocaleDateString("en-US", {
                                                weekday: "long", day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </h3>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                                        disabled={!selectedDate}
                                        onClick={openAddDialog}
                                    >
                                        <ICONS.classSchedules.add className="w-4 h-4" />
                                        {LABELS.classSchedules.page.classes.addClass}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {filteredClasses.length > 0 ? (
                                        filteredClasses.map((cls, index) => (
                                            <ClassCard
                                                key={index}
                                                classItem={cls}
                                                onCancel={(classId, classTitle) => openClassActionDialog(classId, classTitle)}
                                                onViewUsers={(classId, classTitle) => openViewUsersDialog(classId, classTitle)}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center text-muted-foreground py-8">
                                            {LABELS.classSchedules.page.classes.noClasses}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <AddClassModal
                    isOpen={dialogs.addClass}
                    onClose={() => closeDialog('addClass')}
                    selectedDate={selectedDate}
                    classForm={classForm}
                    setClassForm={setClassForm}
                    onAddClass={handleAddClass}
                    coaches={COACHES}
                    classTypes={CLASS_TYPES}
                />

                <ClassActionModal
                    isOpen={dialogs.classAction.isOpen}
                    onClose={() => closeDialog('classAction')}
                    classTitle={dialogs.classAction.classTitle}
                    onCancel={handleCancelClass}
                    onDelete={handleDeleteClass}
                />

                <ViewUsersModal
                    isOpen={dialogs.viewUsers.isOpen}
                    onClose={() => closeDialog('viewUsers')}
                    classTitle={dialogs.viewUsers.classTitle}
                    onViewUsers={handleViewUsers}
                    classId={dialogs.viewUsers.classId}
                />
            </div>
        </SidebarProvider>
    )
}

export default ClassSchedulesPage