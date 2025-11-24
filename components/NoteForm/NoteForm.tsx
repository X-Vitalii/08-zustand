'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent } from 'react';
import css from './NoteForm.module.css';
import type { AddNote, Tag } from '../../types/note';
import { createNote } from '../../lib/api';
import { useNoteDraft } from '@/lib/store/noteStore';

interface Props {
  tags: Tag[];
}

export default function NoteForm({ tags }: Props) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newNote: AddNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleCancel = () => {
    router.push('/notes/filter/all');
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as Tag;
    mutation.mutate({ title, content, tag });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.formGroup}>
        Title
        <input
          defaultValue={draft.title}
          type="text"
          name="title"
          onChange={handleChange}
          className={css.input}
        />
      </label>
      {/* field CONTENT */}
      <label className={css.formGroup}>
        Content
        <textarea
          defaultValue={draft.content}
          name="content"
          rows={8}
          onChange={handleChange}
          className={css.textarea}
        />
      </label>
      <label className={css.formGroup}>
        Tag
        <select
          defaultValue={draft.tag}
          name="tag"
          onChange={handleChange}
          className={css.select}
        >
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <button type="button" className={css.cancelButton} onClick={handleCancel}>
        Cancel
      </button>

      <button type="submit" className={css.submitButton} disabled={false}>
        Create note
      </button>
    </form>
  );
}
