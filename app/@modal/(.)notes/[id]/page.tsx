import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NotePreview.client';
import Modal from '@/components/Modal/Modal';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      {/* <Modal onClose> */}
      <NoteDetailsClient />
      {/* </Modal> */}
    </HydrationBoundary>
  );
}
