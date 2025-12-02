"use client";
import { useRef } from "react";
import createUser from "@/lib/Users/create";

export default function UserForm() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };

    const result = await createUser({
      username: userData.username,
      email: userData.email,
    });

    if (result.success) {
      alert(result.message);
      formRef.current?.reset();
      modalRef.current?.close();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <>
      <button
        className="text-xl cursor-pointer h-10 w-10"
        onClick={() => modalRef.current?.showModal()}
      >
        <svg
          className="h-10 w-10"
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
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Crear Usuario</h3>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Ingresa el username"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Ingresa el email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Crear
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
