import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Tag } from '@/types/note';
import NoteClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

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
