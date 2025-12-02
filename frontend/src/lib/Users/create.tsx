"use server";

import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL || "http://localhost:4000/api";

export default async function createUser(userdata: {
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
