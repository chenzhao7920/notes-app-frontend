'use client';

import { Note } from '@/lib/api/notes';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { NotesAPI } from '@/lib/api/notes';
import { useState } from 'react';
import { NoteModal } from './NoteModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface NoteTableProps {
  notes: Note[];
}

export function NoteTable({ notes: initialNotes }: NoteTableProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await NotesAPI.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
      toast.success('Note deleted successfully');
      router.refresh(); // Refresh the server component
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdate = (updatedNote: Note) => {
    setNotes(notes.map(note =>
      note._id === updatedNote._id ? updatedNote : note
    ));
    setEditingNote(null);
    router.refresh(); // Refresh the server component
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC'
    });
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No notes found</p>
      </div>
    );
  }

  return (
    <>
      <Table aria-label="Notes table">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Content</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note._id}>
              <TableCell>{note.title}</TableCell>
              <TableCell>{note.content}</TableCell>
              <TableCell>{formatDate(note.createdAt)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    color="primary"
                    variant="bordered"
                    onPress={() => handleEdit(note)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="bordered"
                    onPress={() => handleDelete(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingNote && (
        <NoteModal
          isOpen={true}
          onClose={() => setEditingNote(null)}
          onSave={handleUpdate}
          initialData={editingNote}
        />
      )}
    </>
  );
}
