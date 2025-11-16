import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Tag } from '@/types/note';
import NoteClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `NotesList of: ${slug[0]}`,
    description: `Total Notes of ${slug[0]} is ${slug.length}`,
    openGraph: {
      title: `NotesList of: ${slug[0]}`,
      description: `You have ${slug.length} Notes of ${slug[0]}`,
      url: `https://notehub.com/notes/${slug[0]}`,
      images: {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: `NotesList of: ${slug[0]}`,
      },
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as Tag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ page: 1, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteClient tag={tag} />
    </HydrationBoundary>
  );
}
