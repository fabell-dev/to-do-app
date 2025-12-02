import NavBar from "@/components/NavBar";
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
      <NavBar />
      <div className="flex flex-col w-100dvw items-center text-5xl my-10">
        <h1>NOTES</h1>
      </div>
      <Suspense fallback={<div className="bg-base-100">Loading...</div>}>
        <NotesList notes={notesPromise} />
      </Suspense>
    </>
  );
}
