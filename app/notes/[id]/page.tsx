import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getSingleNote } from '@/src/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient
    .query({
      queryKey: ['note', id],
      queryFn: () => getSingleNote(id),
    })
    .catch(() => undefined);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
