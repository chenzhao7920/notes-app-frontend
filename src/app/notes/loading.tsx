import { Spinner } from "@nextui-org/react";
export const runtime = 'edge';
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" label="Loading notes..." />
      </div>
    </div>
  );
}
