// lib/api.ts

import axios from "axios";
import type { Note } from "@/types/note";

const API_BASE = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const api = axios.create({
  baseURL: API_BASE,
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined,
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: number;
  tag?: string;
  sortBy?: "created" | "updated";
  signal?: AbortSignal;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
  sortBy,
  signal,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  try {
    const { data } = await api.get<FetchNotesResponse>("/notes", {
      params: { page, perPage, search, tag, sortBy },
      signal,
    });
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  console.log("API createNote response:", data);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
