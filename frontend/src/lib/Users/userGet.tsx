export default async function getUser(id: string) {
  const URL = `${process.env.API_URL}/users/${id}`;

  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
