const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    cache: "no-store", // Cambia esto en lugar de revalidate
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
