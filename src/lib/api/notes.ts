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
  // Server-side methods with caching
  static async getNotes() {
    return ApiService.serverFetch<ApiResponse<Note[]>>('/notes');
  }

  // Client-side methods for mutations
  static async createNote(data: CreateNoteData) {
    const response = await ApiService.client.post<ApiResponse<Note>>('/notes', data);
    return response.data;
  }

  static async updateNote(id: string, data: UpdateNoteData) {
    const response = await ApiService.client.put<ApiResponse<Note>>(`/notes/${id}`, data);
    return response.data;
  }

  static async deleteNote(id: string) {
    const response = await ApiService.client.delete<ApiResponse<null>>(`/notes/${id}`);
    return response.data;
  }
}
