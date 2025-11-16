import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import css from './NoteList.module.css';
import type { Note } from '../../types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { deleteNote } = await import('../../lib/api');
      return deleteNote(id);
    },
    onSuccess: () => {
      toast.success('Note deleted');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {
      toast.error('Failed to delete note');
    },
  });

  const handleDelete = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.viewButton}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
