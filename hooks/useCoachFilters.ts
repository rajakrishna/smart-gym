'use client';

import { useCallback, useState } from 'react';

interface UseCoachFiltersState {
  selectedCoach: string | null;
  filterCoach: string | null;
}

export const useCoachFilters = () => {
  const [state, setState] = useState<UseCoachFiltersState>({
    selectedCoach: null,
    filterCoach: null,
  });

  const updateState = useCallback(
    (updates: Partial<UseCoachFiltersState>) => setState(prev => ({ ...prev, ...updates })),
    []
  );

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

  return {
    selectedCoach: state.selectedCoach,
    filterCoach: state.filterCoach,
    toggleCoachSelection,
    toggleCoachFilter,
  };
};
