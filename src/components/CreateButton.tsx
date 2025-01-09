'use client';

import { Button } from "@nextui-org/react";
import { useState } from "react";
import { NoteModal } from "./NoteModal";
import { useRouter } from "next/navigation";

export function CreateButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    setIsModalOpen(false);
    router.push('/') // Refresh the page to show the new note with server data
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
