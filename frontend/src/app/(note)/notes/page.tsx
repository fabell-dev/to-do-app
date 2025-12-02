import NotesList from "@/components/NotesList";
import { Suspense } from "react";
import { getNotes } from "@/lib/notesdata";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function page() {
  const notesPromise = getNotes(); //promise

  return (
    <>
      <h1>Notas</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <NotesList notes={notesPromise} />
      </Suspense>
    </>
  );
}
