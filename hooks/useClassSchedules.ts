'use client';

import { useCallback, useState } from 'react';

import { CLASS_SCHEDULE } from '@/constants/classSchedules';
import type { ClassFormData, DialogState } from '@/types/shared';

interface UseClassSchedulesState {
  currentMonth: Date;
  selectedDate: Date | undefined;
  selectedCoach: string | null;
  filterCoach: string | null;
}

export const useClassSchedules = () => {
  const [state, setState] = useState<UseClassSchedulesState>({
    currentMonth: new Date(2025, 5, 9),
    selectedDate: new Date(2025, 5, 9),
    selectedCoach: null,
    filterCoach: null,
  });

  const [dialogs, setDialogs] = useState<DialogState>({
    addClass: false,
    deleteClass: { isOpen: false, classId: null, classTitle: '' },
    cancelClass: { isOpen: false, classId: null, classTitle: '' },
  });

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
      coach: state.selectedCoach || '',
      time: '',
      duration: 60,
      type: '',
    });
  }, [state.selectedCoach]);

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

  // Coach selection handlers
  const toggleCoachSelection = useCallback(
    (coach: string) => {
      const isCurrentlySelected = state.selectedCoach === coach;
      updateState({
        selectedCoach: isCurrentlySelected ? null : coach,
        filterCoach: isCurrentlySelected ? null : coach,
      });
    },
    [state.selectedCoach, updateState]
  );

  const toggleCoachFilter = useCallback(() => {
    updateState({
      filterCoach: state.filterCoach ? null : state.selectedCoach,
    });
  }, [state.filterCoach, state.selectedCoach, updateState]);

  // Dialog handlers
  const openDialog = useCallback(
    (dialogType: 'addClass') => {
      if (dialogType === 'addClass') {
        resetClassForm();
        setDialogs(prev => ({ ...prev, addClass: true }));
      }
    },
    [resetClassForm]
  );

  const closeDialog = useCallback(
    (dialogType: keyof DialogState) => {
      if (dialogType === 'addClass') {
        setDialogs(prev => ({ ...prev, addClass: false }));
        resetClassForm();
      } else {
        setDialogs(prev => ({
          ...prev,
          [dialogType]: { isOpen: false, classId: null, classTitle: '' },
        }));
      }
    },
    [resetClassForm]
  );

  const openActionDialog = useCallback((action: 'delete' | 'cancel', classId: number, classTitle: string) => {
    const dialogKey = action === 'delete' ? 'deleteClass' : 'cancelClass';
    setDialogs(prev => ({
      ...prev,
      [dialogKey]: { isOpen: true, classId, classTitle },
    }));
  }, []);

  // Data getters
  const getClassesForDate = useCallback(() => {
    if (!state.selectedDate) return [];
    const dayOfWeek = state.selectedDate.getDay();
    const dayClasses = CLASS_SCHEDULE.filter(cls => cls.day === dayOfWeek);
    return state.filterCoach ? dayClasses.filter(cls => cls.coach === state.filterCoach) : dayClasses;
  }, [state.selectedDate, state.filterCoach]);

  // Action handlers (placeholders for now)
  const handleAddClass = useCallback(() => {
    console.log('Adding class:', classForm);
    closeDialog('addClass');
  }, [classForm, closeDialog]);

  const handleDeleteClass = useCallback(() => {
    console.log('Deleting class:', dialogs.deleteClass.classId);
    closeDialog('deleteClass');
  }, [dialogs.deleteClass.classId, closeDialog]);

  const handleCancelClass = useCallback(() => {
    console.log('Canceling class:', dialogs.cancelClass.classId);
    closeDialog('cancelClass');
  }, [dialogs.cancelClass.classId, closeDialog]);

  return {
    // State
    state,
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
    openDialog,
    closeDialog,
    openActionDialog,
    handleAddClass,
    handleDeleteClass,
    handleCancelClass,
  };
};
