'use client';

import { useCallback, useState } from 'react';

import type { DialogState } from '@/types/shared';

export const useDialogState = () => {
  const [dialogs, setDialogs] = useState<DialogState>({
    addClass: false,
    deleteClass: { isOpen: false, classId: null, classTitle: '' },
    cancelClass: { isOpen: false, classId: null, classTitle: '' },
    viewUsers: { isOpen: false, classId: null, classTitle: '' },
  });

  const openDialog = useCallback(() => {
    setDialogs(prev => ({ ...prev, addClass: true }));
  }, []);

  const closeDialog = useCallback((dialogType: keyof DialogState) => {
    if (dialogType === 'addClass') {
      setDialogs(prev => ({ ...prev, addClass: false }));
    } else {
      setDialogs(prev => ({
        ...prev,
        [dialogType]: { isOpen: false, classId: null, classTitle: '' },
      }));
    }
  }, []);

  const openActionDialog = useCallback(
    (action: 'delete' | 'cancel' | 'viewUsers', classId: string, classTitle: string) => {
      const dialogKey = action === 'delete' ? 'deleteClass' : action === 'cancel' ? 'cancelClass' : 'viewUsers';
      setDialogs(prev => ({
        ...prev,
        [dialogKey]: { isOpen: true, classId, classTitle },
      }));
    },
    []
  );

  return {
    dialogs,
    openDialog,
    closeDialog,
    openActionDialog,
  };
};
