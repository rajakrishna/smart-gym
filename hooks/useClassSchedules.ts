'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ClassFormData, DialogState, ClassData, Coach } from '@/types/shared';

interface UseClassSchedulesState {
  currentMonth: Date;
  selectedDate: Date | undefined;
  selectedCoach: string | null;
  filterCoach: string | null;
}

export const useClassSchedules = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5, 9));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 5, 9));
  const [selectedCoach, setSelectedCoach] = useState(null)
  const [filterCoach, setFilteredCoach] = useState(null)

  // Dialog state management for the modals
  const [dialogs, setDialogs] = useState<DialogState>({
    addClass: false,
    editClass: false,
    allClasses: false,
    classAction: { isOpen: false, classId: null, classTitle: '' },
    viewUsers: { isOpen: false, classId: null, classTitle: '' },
  });

  const [classForm, setClassForm] = useState<ClassFormData>({
    title: '',
    class_name: '',
    type: '',
    duration: 60,
    coach_id: '',
    time: '',
    category: '',
    capacity: 0,
  });

  const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);

  const fetchClasses = useCallback(async () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().split('T')[0];
    try {
      const res = await fetch(`/api/classes/getAll?date=${dateStr}`);
      const result = await res.json();
      if (Array.isArray(result)) {
        setFilteredClasses(result);
      } else {
        console.error('Unexpected response:', result);
      }
    } catch (err) {
      console.error('Failed to fetch classes:', err);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);


  const [coaches, setCoaches] = useState<Coach[]>([])

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const res = await fetch('/api/coaches/getAll')
        const data = await res.json()
        if (Array.isArray(data)) {
          setCoaches(data)
        }
      } catch (err) {
        console.error('Failed to fetch coaches:', err)
      }
    }

    fetchCoaches()
  }, [])

  const resetClassForm = useCallback(() => {
    setClassForm({
      title: '',
      class_name: '',
      type: '',
      duration: 60,
      coach_id: selectedCoach || '',
      time: '',
      category: '',
      capacity: 0,
    });
  }, [selectedCoach]);

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

  // const filteredClasses = selectedDate ? CLASS_SCHEDULE.filter(cls => cls.day === selectedDate.getDay()) : [];

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
    setClassForm({ title: '', class_name: '', coach_id: '', category: '', capacity: 0, time: '', duration: 60, type: '' });
    setDialogs(prev => ({ ...prev, addClass: true }));
  };

  const openEditDialog = (classId: string, classTitle: string) => {
    setClassForm({ title: '', class_name: '', coach_id: '', category: '', capacity: 0, time: '', duration: 60, type: '' });
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
    fetchClasses,
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