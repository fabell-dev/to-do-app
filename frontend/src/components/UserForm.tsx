"use client";
import { useRef, useState } from "react";
import createUser from "@/lib/Users/create";

export default function UserForm() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const result = await createUser({
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    });

    setIsLoading(false);

    if (!result.success) {
      alert(`Error: ${result.error}`);
      return;
    }

    formRef.current?.reset();
    modalRef.current?.close();
  };

  return (
    <>
      <button onClick={() => modalRef.current?.showModal()}>
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Crear Usuario</h3>

          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Username"
              className="input input-bordered w-full mb-4"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              required
            />

            <div className="modal-action">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Creando..." : "Crear"}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
                disabled={isLoading}
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
