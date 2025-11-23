import { create } from 'zustand';
import { AddNote } from '@/types/note';
import { persist } from 'zustand/middleware';

interface NoteDraft {
  draft: AddNote;
  setDraft: (newDraft: AddNote) => void;
  clearDraft: () => void;
}

const initialDraft: AddNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteDraft = create<NoteDraft>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (newDraft: AddNote) => set({ draft: newDraft }),
        clearDraft: () => set({ draft: initialDraft }),
      };
    },
    {
      name: 'draft',
      partialize(state) {
        return { draft: state.draft };
      },
    },
  ),
);
