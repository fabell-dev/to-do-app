import UsersList from "@/components/UsersList";
import { Suspense } from "react";
import { getUsers } from "@/lib/usersdata";

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
