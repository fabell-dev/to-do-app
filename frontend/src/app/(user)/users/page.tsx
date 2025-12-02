import UsersList from "@/components/UsersList";
import { Suspense } from "react";

const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default function page() {
  const usersPromise = getUsers(); //promise
  // const usersFetch = await getUsers(); //Promesa resuelta

  return (
    <>
      <h1>Usuarios</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <UsersList users={usersPromise} />
      </Suspense>
    </>
  );
}
