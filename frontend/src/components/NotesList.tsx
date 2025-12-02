"use client";
import { use } from "react";
interface Notes {
  _id: string;
  title: string;
  content: string;
  author: string;
  date_created: string;
  __v: number;
}
interface ApiResponse {
  success: boolean;
  message: string;
  data: Notes[];
  count: number;
}

export default function Notes({ notes }: { notes: Promise<ApiResponse> }) {
  const response = use(notes);
  const allNotes = response.data;

  return (
    <ul>
      {allNotes.map((note, index) => (
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
