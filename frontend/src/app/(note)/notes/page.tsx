import NotesList from "@/components/NotesList";
import { Suspense } from "react";

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

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
