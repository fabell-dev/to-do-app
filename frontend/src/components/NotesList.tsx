"use client";
import { use } from "react";

export default function Notes({
  notes,
}: {
  notes: Promise<{ title: string; content: string; author: string }[]>;
}) {
  const allUsers = use(notes);
  return (
    <ul>
      {allUsers.map((note, index) => (
        <li
          key={index}
          className="bg-red-400 border-2 border-amber-300 m-10 w-60"
        >
          <h1>TITLE: {note.title}</h1>
          <h2>CONTENT: {note.content}</h2>
          <h3>AYTHOR:{note.author}</h3>
        </li>
      ))}
    </ul>
  );
}
