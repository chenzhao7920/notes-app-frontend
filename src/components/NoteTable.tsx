'use client';

import { Note } from '@/lib/api/notes';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useState } from 'react';
import { NoteModal } from './NoteModal';
import toast from 'react-hot-toast';
import { deleteNoteAction } from '@/app/notes/actions';

interface NoteTableProps {
  notes: Note[];
}

export function NoteTable({ notes: initialNotes }: NoteTableProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteNoteAction(id);
      setNotes(notes.filter(note => note._id !== id));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.log(error)
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
