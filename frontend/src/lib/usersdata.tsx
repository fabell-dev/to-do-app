const API_URL = `${process.env.API_URL}/users`;

export async function getUsers() {
  const res = await fetch(`${API_URL}`, {
    next: { revalidate: 60 }, // Revalidar cada minuto 60s
  });

  if (!res.ok) throw new Error("Failed to fetch users");
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  return res.json();
}
