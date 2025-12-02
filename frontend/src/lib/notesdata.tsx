const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`, {
    next: { revalidate: 60 }, // Revalidar cada minuto
  });

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}
