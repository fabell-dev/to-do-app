"use client";
import createUser from "@/lib/Users/create";
import UserForm from "./UserForm";

export default function UsersHeader() {
  return (
    <>
      <div className="flex text-5xl my-10 items-center">
        <h1 className="flex-1 text-center">USERS</h1>
        <UserForm />
      </div>
    </>
  );
}
