'use server';

import { CreateNoteData, UpdateNoteData } from '@/lib/api/notes';
import { revalidateTag } from 'next/cache';

const API_URL = 'http://localhost:5000';

export async function createNoteAction(data: CreateNoteData) {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    revalidateTag('notes');
    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create note');
  }
}

export async function updateNoteAction(id: string, data: UpdateNoteData) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update note');
    }

    revalidateTag('notes');
    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update note');
  }
}

export async function deleteNoteAction(id: string) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note');
    }

    revalidateTag('notes');
    return response.json();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to delete note');
  }
}
