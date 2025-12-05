"use client";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createUser, updateUser, deleteUser } from "@/lib/usersOptions";

interface UserModalProps {
  mode?: "create" | "edit";
  user?: {
    id: string;
    name?: string;
    username?: string;
    email?: string;
  };
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export default function UserForm({
  mode,
  user,
  trigger,
  onSuccess,
}: UserModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && user && formRef.current) {
      const form = formRef.current;
      (form.elements.namedItem("name") as HTMLInputElement).value =
        user.name || "";
      (form.elements.namedItem("username") as HTMLInputElement).value =
        user.username || "";
      (form.elements.namedItem("email") as HTMLInputElement).value =
        user.email || "";
    }
  }, [mode, user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const userData = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      ...(mode === "create" && {
        password: formData.get("password") as string,
      }),
    };

    const result =
      mode === "create"
        ? await createUser(userData as any)
        : await updateUser(user!.id, userData);

    setIsLoading(false);

    if (!result.success) {
      toast.error(
        result.error ||
          `Error al ${mode === "create" ? "crear" : "actualizar"} usuario`
      );
      return;
    }

    toast.success(
      result.message ||
        `Usuario ${mode === "create" ? "creado" : "actualizado"} correctamente`
    );
    formRef.current?.reset();
    modalRef.current?.close();
    onSuccess?.();
  };

  return (
    <>
      <div onClick={() => modalRef.current?.showModal()}>{trigger}</div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {mode === "create" ? "Crear Usuario" : "Editar Usuario"}
          </h3>

          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Jhon Doe"
              className="input input-bordered w-full mb-4"
              defaultValue={user?.name || ""}
              required
            />
            <input
              name="username"
              placeholder="Username"
              className="input input-bordered w-full mb-4"
              defaultValue={user?.username || ""}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered w-full mb-4"
              defaultValue={user?.email || ""}
              required
            />
            {mode === "create" && (
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full mb-4"
                required
              />
            )}
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-accent"
                disabled={isLoading}
              >
                {isLoading
                  ? "Guardando..."
                  : mode === "create"
                  ? "Crear"
                  : "Actualizar"}
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

///DELETE--------
export function DeleteForm({ user, trigger, onSuccess }: UserModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDelete = async () => {
    const result = await deleteUser(user!.id);

    if (!result.success) {
      toast.error(result.error || `Error al eliminar usuario`);
      return;
    }

    toast.success(result.message || `Usuario eliminado correctamente`);
    modalRef.current?.close();
    onSuccess?.();
  };

  return (
    <>
      <div onClick={() => modalRef.current?.showModal()}>{trigger}</div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Eliminar Usuario</h3>
          <p className="mb-4">
            ¿Estás seguro de que deseas eliminar este usuario?
          </p>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => modalRef.current?.close()}
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-error"
            >
              Eliminar
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button">Cerrar</button>
        </form>
      </dialog>
    </>
  );
}
