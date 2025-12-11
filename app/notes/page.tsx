// app/notes/page.tsx

"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "../../types/note";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import Modal from "../../components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const queryClient = useQueryClient();

  // Дебаунсована функція зміни пошуку
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 900);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", currentPage, searchQuery],
    queryFn: () =>
      fetchNotes({ page: currentPage, perPage: 12, search: searchQuery }),
    placeholderData: () =>
      queryClient.getQueryData(["notes", currentPage - 1, searchQuery]),
  });

  if (isFetching && !data)
    return <p className={css.message}>Loading notes...</p>;
  if (isError) return <p className={css.message}>Error loading notes.</p>;

  const notes: Note[] = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Використовуємо SearchBox з defaultValue для неконтрольованого input */}
        <SearchBox defaultValue={searchQuery} onChange={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            setPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}

        <button onClick={() => setIsFormOpen(true)} className={css.button}>
          Create Note
        </button>
      </header>

      <main className={css.main}>
        {isFormOpen && (
          <Modal onClose={() => setIsFormOpen(false)}>
            <NoteForm onClose={() => setIsFormOpen(false)} />
          </Modal>
        )}

        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
          <p className={css.message}>No notes found.</p>
        )}
      </main>
    </div>
  );
}
