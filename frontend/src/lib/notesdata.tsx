const API_URL = process.env.API_URL || "http://localhost:4000/api";

export async function getNotes() {
  const res = await fetch(`${API_URL}/notes`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}
