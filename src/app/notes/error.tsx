'use client';

import { Button } from "@nextui-org/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold text-red-500">Something went wrong!</h2>
        <p className="text-gray-600">{error.message}</p>
        <Button
          color="primary"
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
