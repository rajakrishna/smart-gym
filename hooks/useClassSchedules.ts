'use client';

import { useCallback, useState } from 'react';

import { CLASS_SCHEDULE } from '@/constants/classSchedules';
import type { ClassFormData } from '@/types/shared';

import { useCoachFilters } from './useCoachFilters';
import { useDialogState } from './useDialogState';

interface UseClassSchedulesState {
  currentMonth: Date;
  selectedDate: Date | undefined;
}

export const useClassSchedules = () => {
  const [state, setState] = useState<UseClassSchedulesState>({
    currentMonth: new Date(2025, 5, 9),
    selectedDate: new Date(2025, 5, 9),
  });

  const { dialogs, openDialog, closeDialog, openActionDialog } = useDialogState();
  const { selectedCoach, filterCoach, toggleCoachSelection, toggleCoachFilter } = useCoachFilters();

  const [classForm, setClassForm] = useState<ClassFormData>({
    title: '',
    coach: '',
    time: '',
    duration: 60,
    type: '',
  });

  // State updaters
  const updateState = useCallback(
    (updates: Partial<UseClassSchedulesState>) => setState(prev => ({ ...prev, ...updates })),
    []
  );

  const resetClassForm = useCallback(() => {
    setClassForm({
      title: '',
      coach: selectedCoach || '',
      time: '',
      duration: 60,
      type: '',
    });
  }, [selectedCoach]);

  // Navigation handlers
  const handleMonthChange = useCallback(
    (monthName: string) => {
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
        const newMonth = new Date(state.currentMonth.getFullYear(), monthIndex, 1);
        updateState({ currentMonth: newMonth });
      }
    },
    [state.currentMonth, updateState]
  );

  const handleDateSelect = useCallback(
    (date: Date | undefined) => {
      if (date) {
        const updates: Partial<UseClassSchedulesState> = { selectedDate: date };
        if (
          date.getMonth() !== state.currentMonth.getMonth() ||
          date.getFullYear() !== state.currentMonth.getFullYear()
        ) {
          updates.currentMonth = date;
        }
        updateState(updates);
      }
    },
    [state.currentMonth, updateState]
  );

  const goToToday = useCallback(() => {
    const today = new Date();
    updateState({ selectedDate: today, currentMonth: today });
  }, [updateState]);

  // Data getters
  const getClassesForDate = useCallback(() => {
    if (!state.selectedDate) return [];
    const dayOfWeek = state.selectedDate.getDay();
    const dayClasses = CLASS_SCHEDULE.filter(cls => cls.day === dayOfWeek);
    return filterCoach ? dayClasses.filter(cls => cls.coach === filterCoach) : dayClasses;
  }, [state.selectedDate, filterCoach]);

  // Enhanced dialog handler
  const openDialogWithReset = useCallback(
    (dialogType: 'addClass') => {
      if (dialogType === 'addClass') {
        resetClassForm();
      }
      openDialog(dialogType);
    },
    [resetClassForm, openDialog]
  );

  // Action handlers (placeholders for now)
  const handleAddClass = useCallback(() => {
    // TODO: Implement actual class creation logic
    closeDialog('addClass');
  }, [closeDialog]);

  const handleDeleteClass = useCallback(() => {
    // TODO: Implement actual class deletion logic
    closeDialog('deleteClass');
  }, [closeDialog]);

  const handleCancelClass = useCallback(() => {
    // TODO: Implement actual class cancellation logic
    closeDialog('cancelClass');
  }, [closeDialog]);

  const handleViewUsers = useCallback(() => {
    // TODO: Implement actual view users logic
    closeDialog('viewUsers');
  }, [closeDialog]);

  return {
    // State
    state: { ...state, selectedCoach, filterCoach },
    dialogs,
    classForm,
    setClassForm,
    filteredClasses: getClassesForDate(),

    // Handlers
    handleMonthChange,
    handleDateSelect,
    goToToday,
    toggleCoachSelection,
    toggleCoachFilter,
    openDialog: openDialogWithReset,
    closeDialog,
    openActionDialog,
    handleAddClass,
    handleDeleteClass,
    handleCancelClass,
    handleViewUsers,
  };
};
