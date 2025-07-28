'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarProvider } from '@/components/ui/sidebar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AddClassModal, DeleteClassModal, CancelClassModal } from '@/components/class-schedules/modals'
import CoachTypeSection from '@/components/class-schedules/CoachTypeSidebarSection'
import ClassCard from '@/components/class-schedules/ClassCard'
import { useClassSchedules } from '@/hooks/useClassSchedules'
import { COACHES, CLASS_TYPES } from '@/constants/classSchedules'
import { groupCoachesByType } from '@/lib/classScheduleUtils'
import LABELS from '@/constants/labels'
import ICONS from '@/constants/icons'

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
        state,
        dialogs,
        classForm,
        setClassForm,
        filteredClasses,
        handleMonthChange,
        handleDateSelect,
        goToToday,
        toggleCoachSelection,
        toggleCoachFilter,
        openDialog,
        closeDialog,
        openActionDialog,
        handleAddClass,
        handleDeleteClass,
        handleCancelClass,
    } = useClassSchedules()

    const activeTab = MONTH_NAMES[state.currentMonth.getMonth()]
    const coachGroups = groupCoachesByType()

    console.log(state.selectedDate)

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
                                                    selectedCoach={state.selectedCoach}
                                                    filterCoach={state.filterCoach}
                                                    onCoachSelect={toggleCoachSelection}
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
                                            selected={state.selectedDate}
                                            onSelect={handleDateSelect}
                                            month={state.currentMonth}
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
                                            {LABELS.classSchedules.page.classes.title} {state.selectedDate?.toLocaleDateString("en-US", {
                                                weekday: "long", day: "numeric", month: "long", year: "numeric"
                                            })}
                                        </h3>
                                        {state.selectedCoach && (
                                            <span className={`text-sm px-2 py-1 rounded ${state.filterCoach
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                                                }`}>
                                                {state.filterCoach ? LABELS.classSchedules.page.classes.filteredLabel : LABELS.classSchedules.page.classes.selectedLabel} {state.selectedCoach}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={state.filterCoach ? "default" : "outline"}
                                            size="sm"
                                            onClick={toggleCoachFilter}
                                            className="flex items-center gap-2"
                                            disabled={!state.selectedCoach}
                                        >
                                            <ICONS.classSchedules.filter className="w-4 h-4" />
                                            {state.filterCoach ? LABELS.classSchedules.page.classes.showAllClasses : LABELS.classSchedules.page.classes.filterByCoach}
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                                            disabled={!state.selectedDate}
                                            onClick={() => openDialog('addClass')}
                                        >
                                            <ICONS.classSchedules.add className="w-4 h-4" />
                                            {LABELS.classSchedules.page.classes.addClass}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                    {filteredClasses.length > 0 ? (
                                        filteredClasses.map((cls, index) => (
                                            <ClassCard
                                                key={index}
                                                classItem={cls}
                                                onCancel={(classId, classTitle) => openActionDialog('cancel', classId, classTitle)}
                                                onDelete={(classId, classTitle) => openActionDialog('delete', classId, classTitle)}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center text-muted-foreground py-8">
                                            {state.filterCoach ? (
                                                <div className="space-y-2">
                                                    <div>{LABELS.classSchedules.page.classes.noClassesFiltered} <span className="font-medium text-blue-600">{state.filterCoach}</span> {LABELS.classSchedules.page.classes.noClassesFilteredSubtext}</div>
                                                    <div className="text-xs">{LABELS.classSchedules.page.classes.showAllHint}</div>
                                                </div>
                                            ) : LABELS.classSchedules.page.classes.noClasses}
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
                    selectedDate={state.selectedDate}
                    classForm={classForm}
                    setClassForm={setClassForm}
                    onAddClass={handleAddClass}
                    coaches={COACHES}
                    classTypes={CLASS_TYPES}
                />

                <DeleteClassModal
                    isOpen={dialogs.deleteClass.isOpen}
                    onClose={() => closeDialog('deleteClass')}
                    classTitle={dialogs.deleteClass.classTitle}
                    onDelete={handleDeleteClass}
                />

                <CancelClassModal
                    isOpen={dialogs.cancelClass.isOpen}
                    onClose={() => closeDialog('cancelClass')}
                    classTitle={dialogs.cancelClass.classTitle}
                    onCancel={handleCancelClass}
                />
            </div>
        </SidebarProvider>
    )
}

export default ClassSchedulesPage