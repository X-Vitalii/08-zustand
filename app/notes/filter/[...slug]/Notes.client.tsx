'use client';

import { useState, type ChangeEvent } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import { fetchNotes } from '@/lib/api';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import { Tag } from '@/types/note';
import Link from 'next/link';

interface Props {
  tag?: Tag;
}

export default function NoteClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedValue] = useDebounce(query, 3000);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['notes', debouncedValue, page, tag],
    queryFn: () => fetchNotes({ query: debouncedValue, page, tag }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={query} onChangeQuery={onChangeQuery} />

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(selectedPage) => setPage(selectedPage)}
            />
          )}
          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load notes</p>}
          <Link href="/notes/action/create" className={css.createLink}>
            Create note
          </Link>
        </header>
        {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}
