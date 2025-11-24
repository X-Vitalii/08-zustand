import { Metadata } from 'next';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import css from '../../../../components/NoteForm/NoteForm.module.css';
import { Tag } from '@/types/note';

export const metadata: Metadata = {
  title: 'New note creation Form at NoteHUB',
  description: 'Simple fields to fast note creation',
  openGraph: {
    title: `New note creation Form at NoteHUB`,
    description: 'Fill in fields and just click "Create note" button',
    url: `https://notehub.com/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `Add new note easily at NoteHUB`,
      },
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `Just add new note at NoteHUB`,
      },
    ],
  },
};

export default function NoteCreatePage() {
  const tags = ['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'] as Tag[];
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm tags={tags} />;
      </div>
    </main>
  );
}
