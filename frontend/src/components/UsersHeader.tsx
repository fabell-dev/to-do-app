"use client";
import UserModal from "./UserForm";

export default function UsersHeader() {
  return (
    <div className="flex text-5xl my-10 items-center">
      <h1 className="flex-1 text-center">USERS</h1>
      <div className="absolute right-5 p-2 btn btn-square btn-ghost h-15 w-15">
        <UserModal
          mode="create"
          trigger={
            <button className="btn btn-square btn-ghost h-15 w-15 rounded-2xl">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8M12 8v8" />
              </svg>
            </button>
          }
        />
      </div>
    </div>
  );
}
