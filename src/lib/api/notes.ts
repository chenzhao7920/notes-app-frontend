import { ApiService, ApiResponse } from './base';

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export type CreateNoteData = Pick<Note, 'title' | 'content'>;
export type UpdateNoteData = CreateNoteData;

export class NotesAPI {
  // Server-side methods
  static async getNotes() {
    return ApiService.serverFetch<ApiResponse<Note[]>>('/notes');
  }

  // Client-side methods
  static async createNote(data: CreateNoteData) {
    return ApiService.client.post<ApiResponse<Note>>('/notes', data);
  }

  static async updateNote(id: string, data: UpdateNoteData) {
    return ApiService.client.put<ApiResponse<Note>>(`/notes/${id}`, data);
  }

  static async deleteNote(id: string) {
    return ApiService.client.delete<ApiResponse<null>>(`/notes/${id}`);
  }
}
