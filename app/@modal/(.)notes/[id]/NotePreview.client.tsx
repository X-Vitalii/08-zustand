'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';
import Modal from '@/components/Modal/Modal';

export default function NoteDetailsClient() {
  const router = useRouter();
  const onClose = () => router.back();

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
    <Modal onClose={onClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleString()}
          </p>
          <p className={css.tag}>{note.tag}</p>
        </div>
      </div>
    </Modal>
  );
}
