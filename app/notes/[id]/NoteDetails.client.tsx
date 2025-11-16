'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const idStr = params.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', idStr],
    queryFn: () => fetchNoteById(idStr),
    refetchOnMount: false,
  });
  if (isLoading) return <p>Loading, plz wait...</p>;
  if (isError || !note) return <p>Something went wrong...</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
        <p className={css.tag}>{note.tag}</p>
      </div>
    </div>
  );
}
