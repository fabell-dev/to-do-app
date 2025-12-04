import NavBar from "@/components/NavBar";
import NotesList from "@/components/Notes/NotesList";
import NotesHeader from "@/components/Notes/NotesHeader";
import "../../globals.css";
import { Suspense } from "react";

export default function page() {
  const notesPromise = getNotes(); //promise

  return (
    <>
      <NavBar />
      <NotesHeader />
      <Suspense fallback={<div className="bg-base-100">Loading...</div>}>
        <NotesList notes={notesPromise} />
      </Suspense>
    </>
  );
}

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}
