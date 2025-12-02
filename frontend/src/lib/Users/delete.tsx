"use server";

import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL || "http://localhost:4000/api";

export default async function deleteUser(id: string) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.status}`);
    }

    console.log("Item deleted successfully!");
    revalidatePath("/users");

    return { success: true, message: "Usuario eliminado correctamente" };
  } catch (error) {
    console.error("Network error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
