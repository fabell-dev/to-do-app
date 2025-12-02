"use server";

import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL || "http://localhost:4000/api";

export default async function putUser() {
  return <h1>Codigo para modificar usuario</h1>;
}
