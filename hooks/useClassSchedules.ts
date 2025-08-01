'use client';

import { useState } from 'react';

import { CLASS_SCHEDULE } from '@/constants/classSchedules';
import type { ClassFormData, DialogState } from '@/types/shared';

export const useClassSchedules = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 9));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 5, 9));

  // Dialog state management for the modals
  const [dialogs, setDialogs] = useState<DialogState>({
    addClass: false,
    classAction: { isOpen: false, classId: null, classTitle: '' },
    viewUsers: { isOpen: false, classId: null, classTitle: '' },
  });

  const [classForm, setClassForm] = useState<ClassFormData>({
    title: '',
    coach: '',
    time: '',
    duration: 60,
    type: '',
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      if (date.getMonth() !== currentMonth.getMonth() || date.getFullYear() !== currentMonth.getFullYear()) {
        setCurrentMonth(date);
      }
    }
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  };

  const filteredClasses = selectedDate ? CLASS_SCHEDULE.filter(cls => cls.day === selectedDate.getDay()) : [];

  const handleMonthChange = (monthName: string) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthIndex = monthNames.findIndex(month => month === monthName);
    if (monthIndex !== -1) {
      const newMonth = new Date(currentMonth.getFullYear(), monthIndex, 1);
      setCurrentMonth(newMonth);
    }
  };

  const openAddDialog = () => {
    setClassForm({ title: '', coach: '', time: '', duration: 60, type: '' });
    setDialogs(prev => ({ ...prev, addClass: true }));
  };

  const openClassActionDialog = (classId: string, classTitle: string) => {
    setDialogs(prev => ({
      ...prev,
      classAction: { isOpen: true, classId, classTitle },
    }));
  };

  const openViewUsersDialog = (classId: string, classTitle: string) => {
    setDialogs(prev => ({
      ...prev,
      viewUsers: { isOpen: true, classId, classTitle },
    }));
  };

  const closeDialog = (dialogType: keyof DialogState) => {
    if (dialogType === 'addClass') {
      setDialogs(prev => ({ ...prev, addClass: false }));
    } else {
      setDialogs(prev => ({
        ...prev,
        [dialogType]: { isOpen: false, classId: null, classTitle: '' },
      }));
    }
  };

  // TODO: Action handlers to use with APIs in the modals (Talk to Danny about using these vs on the modal components)
  const handleAddClass = () => {
    // TODO: Implement actual class creation logic
    closeDialog('addClass');
  };

  const handleDeleteClass = () => {
    // TODO: Implement actual class deletion logic
    closeDialog('classAction');
  };

  const handleCancelClass = () => {
    // TODO: Implement actual class cancellation logic
    closeDialog('classAction');
  };

  const handleViewUsers = () => {
    // TODO: Implement actual view users logic
    closeDialog('viewUsers');
  };

  return {
    // State
    currentMonth,
    selectedDate,
    dialogs,
    classForm,
    setClassForm,
    filteredClasses,

    // Handlers
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
  };
};
