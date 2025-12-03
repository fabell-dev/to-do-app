"use server";

import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL || "http://localhost:4000/api";

//CREATE
export async function createUser(userdata: {
  username: string;
  email: string;
}) {
  const postData = {
    username: userdata.username,
    email: userdata.email,
  };
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create user: ${response.status}`
      );
    }

    const data = await response.json();
    console.log("User created successfully!");
    revalidatePath("/users");

    return {
      success: true,
      message: data.message || "Usuario creado correctamente",
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
export async function deleteUser(id: string) {
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

//EDIT
export async function updateUser(
  id: string,
  userdata: {
    username: string;
    email: string;
  }
) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to update user: ${response.status}`
      );
    }

    const data = await response.json();
    revalidatePath("/users");

    return {
      success: true,
      message: data.message || "Usuario actualizado correctamente",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
