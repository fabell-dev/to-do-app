import NavBar from "@/components/NavBar";
import UsersHeader from "@/components/UsersHeader";
import UsersList from "@/components/UsersList";
import { Suspense } from "react";

export default function page() {
  const usersPromise = getUsers(); //promise

  return (
    <>
      <NavBar />
      <UsersHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <UsersList users={usersPromise} />
      </Suspense>
    </>
  );
}

const API_URL = process.env.API_URL || "http://localhost:4000/api";
//Fetch Users and Pass it as a promise
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
