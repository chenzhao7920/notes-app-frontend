export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { NotesAPI } from '@/lib/api/notes';
import { NoteTable } from '../../components/NoteTable';
import { CreateButton } from '../../components/CreateButton';


export default async function NotesPage() {
  const response = await NotesAPI.getNotes();
  const notes = response.data;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">N</span>
            </div>
            <h1 className="text-2xl font-semibold">Notes App</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">Total Notes: {notes.length}</p>
            <CreateButton />
          </div>
          <NoteTable notes={notes} />
        </div>
      </div>
    </main>
  );
}
