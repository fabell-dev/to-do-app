const API_URL = process.env.API_URL;

export async function getUsers() {
  const res = await fetch(`${API_URL}/users`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
