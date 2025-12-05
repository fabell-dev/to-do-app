"use client";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createNote, deleteNote, updateNote } from "@/lib/notesOptions";

interface UserModalProps {
  mode?: "create" | "edit";
  note?: {
    id: string;
    title?: string;
    content?: string;
  };
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export default function NoteForm({
  mode,
  note,
  trigger,
  onSuccess,
}: UserModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && note && formRef.current) {
      const form = formRef.current;
      (form.elements.namedItem("title") as HTMLInputElement).value =
        note.title || "";
      (form.elements.namedItem("content") as HTMLInputElement).value =
        note.content || "";
    }
  }, [mode, note]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);

    const noteData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    };

    const result =
      mode === "create"
        ? await createNote(noteData)
        : await updateNote(note!.id, noteData);

    setIsLoading(false);

    if (!result.success) {
      toast.error(
        result.error ||
          `Error al ${mode === "create" ? "crear" : "actualizar"} nota`
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
            {mode === "create" ? "Crear Nota" : "Editar Nota"}
          </h3>

          <form ref={formRef} onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Titulo"
              className="input input-bordered w-full mb-4"
              defaultValue={note?.title}
              required
            />
            <input
              name="content"
              placeholder="Contenido"
              className="input input-bordered w-full mb-4"
              defaultValue={note?.content}
              required
            />

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

export function DeleteForm({ note, trigger, onSuccess }: UserModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleDelete = async () => {
    const result = await deleteNote(note!.id);

    if (!result.success) {
      toast.error(result.error || `Error al eliminar nota`);
      modalRef.current?.close();
      return;
    }

    toast.success(result.message || `Nota eliminada correctamente`);
    modalRef.current?.close();
    onSuccess?.();
  };

  return (
    <>
      <div onClick={() => modalRef.current?.showModal()}>{trigger}</div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Eliminar Nota</h3>
          <p className="mb-4">
            ¿Estás seguro de que deseas eliminar esta nota?
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
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
