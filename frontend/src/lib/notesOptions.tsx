"use server";

import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL || "http://localhost:4000/api";

//CREATE
export async function createNote(userdata: { title: string; content: string }) {
  const postData = {
    title: userdata.title,
    content: userdata.content,
  };
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create note: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("Note created successfully!");
    revalidatePath("/notes");

    return {
      success: true,
      message: data.message || "Note creado correctamente",
    };
  } catch (error) {
    console.error("Network error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

//DELETE
export async function deleteNote(id: string) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status}`);
    }

    console.log("Item deleted successfully!");
    revalidatePath("/notes");

    return { success: true, message: "Nota eliminado correctamente" };
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

//EDIT
export async function updateNote(
  id: string,
  userdata: {
    title: string;
    content: string;
  }
) {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to update note: ${response.status}`
      );
    }

    const data = await response.json();
    revalidatePath("/notes");

    return {
      success: true,
      message: data.message || "Nota actualizado correctamente",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
