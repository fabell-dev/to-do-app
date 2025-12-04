import Link from "next/link";
import ThemeController from "./ThemeController";

export default function NavBar() {
  return (
    <>
      <div className="navbar border-b-2 border-secondary rounded-b-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/users">Users</Link>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
            </ul>
          </div>
          <Link href=".." className="btn btn-ghost text-xl">
            Note App
          </Link>
        </div>
        {/* OPTIONS */}
        <div className="navbar-end hidden lg:flex mr-10">
          <Link
            className="btn btn-square btn-ghost px-10 py-7 rounded-2xl text-2xl"
            href="/users"
          >
            Users
          </Link>
          <div className="ml-5">
            <ThemeController />
          </div>
        </div>
      </div>
    </>
  );
}
