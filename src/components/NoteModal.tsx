'use client';

import { Note, CreateNoteData } from '@/lib/api/notes';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createNoteAction, updateNoteAction } from '@/app/notes/actions';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
  initialData?: Note;
}

export function NoteModal({ isOpen, onClose, onSave, initialData }: NoteModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateNoteData>({
    title: initialData?.title || '',
    content: initialData?.content || ''
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = initialData
        ? await updateNoteAction(initialData._id, formData)
        : await createNoteAction(formData);

      onSave(response.data);
      toast.success(initialData ? 'Note updated successfully' : 'Note created successfully');
      onClose();
    } catch (error) {
      console.log(error)
      toast.error(initialData ? 'Failed to update note' : 'Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Note' : 'Create Note'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder="Enter note title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Textarea
              label="Content"
              placeholder="Enter note content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit} isLoading={isLoading}>
            {initialData ? 'Update' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
