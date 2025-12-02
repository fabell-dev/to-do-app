"use client";
import { use } from "react";

export default function UsersList({ users }: { users: Promise<any[]> }) {
  const allUsers = use(users);
  return (
    <ul>
      {allUsers.map((user, index) => (
        <li
          key={index}
          className="bg-red-400 border-2 border-amber-300 m-10 w-50"
        >
          <h1>NAME: {user.name}</h1>
          <h2>EMAIL: {user.email}</h2>
        </li>
      ))}
    </ul>
  );
}
