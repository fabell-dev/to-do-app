"use client";

import { use } from "react";
import UserModal, { DeleteForm } from "./UserForm";

interface User {
  _id: string;
  name?: string;
  username: string;
  email: string;
  date_created: string;
  __v: number;
}
interface ApiResponse {
  success: boolean;
  message: string;
  data: User[];
  count: number;
}

export default function UsersList({ users }: { users: Promise<ApiResponse> }) {
  const response = use(users);
  const allUsers = response.data;

  //Component
  return (
    <ul className="list shadow-md">
      {allUsers.map((user) => (
        <li key={user._id} className="list-row">
          <div>
            <UserAvatar />
          </div>
          <div className="cursor-default">
            <div>{user.username}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {user.email}
            </div>
          </div>

          <UserModal
            mode="edit"
            user={{
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
            }}
            trigger={
              <button className="btn btn-square btn-ghost h-15 w-15 rounded-2xl">
                <EditIcon />
              </button>
            }
          />
          <DeleteForm
            user={{
              id: user._id,
            }}
            trigger={
              <button className="btn btn-square btn-ghost h-15 w-15 rounded-2xl">
                <DeleteIcon />
              </button>
            }
          />
        </li>
      ))}
    </ul>
  );
}

//SVG
function UserAvatar() {
  return (
    <svg
      className="size-10 rounded-box"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      className="h-8 w-8"
      width="24"
      height="24"
      stroke="gray"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
        fill="#0F0F0F"
      />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg className="h-8 w-8" width="24" height="24" viewBox="0 -0.5 21 21">
      <g stroke="gray" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-179.000000, -360.000000)" fill="#000000">
          <g transform="translate(56.000000, 160.000000)">
            <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" />
          </g>
        </g>
      </g>
    </svg>
  );
}
