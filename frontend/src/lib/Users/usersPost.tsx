export default async function postUsers(userData: {
  username: string;
  email: string;
}) {
  const URL = `${process.env.API_URL}/users`;

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting user:", error);
    throw error;
  }
}
