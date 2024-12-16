'use client';

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { NoteModal } from "./NoteModal";
import { Note } from "@/lib/api/notes";
import { useRouter } from "next/navigation";

export function CreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSave = (note: Note) => {
    setIsModalOpen(false);
    router.refresh(); // Refresh the page to show the new note
  };

  return (
    <>
      <Button
        color="primary"
        onPress={() => setIsModalOpen(true)}
      >
        Create Note
      </Button>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
