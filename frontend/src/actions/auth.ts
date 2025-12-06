"use server";
import { createUser } from "@/lib/usersOptions";
import { SignupFormSchema, type SignupFormState } from "@/validations/sign";
import { SigninFormSchema, type SigninFormState } from "@/validations/sign";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function registerUserAction(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const fields = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    cpassword: formData.get("cpassword") as string,
  };

  const validatedFields = SignupFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: undefined,
      data: fields,
      Errors: {
        username: flattenedErrors.fieldErrors.username,
        email: flattenedErrors.fieldErrors.email,
        password: flattenedErrors.fieldErrors.password,
        cpassword: flattenedErrors.fieldErrors.cpassword,
      },
    };
  } else {
    const response = await createUser(fields);
    if (response.error) {
      return {
        success: false,
        message: response.error,
        data: fields,
        Errors: {
          username: [response.error],
        },
      };
    }

    redirect("/");
  }
}

export async function loginUserAction(
  prevState: SigninFormState,
  formData: FormData
): Promise<SigninFormState> {
  const fields = {
    identifier: formData.get("identifier") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SigninFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error);

    return {
      success: false,
      message: undefined,
      data: fields,
      Errors: {
        identifier: flattenedErrors.fieldErrors.identifier,
        password: flattenedErrors.fieldErrors.password,
      },
    };
  }

  const API_URL = process.env.API_URL || "http://localhost:4000/api";

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: fields.identifier,
        password: fields.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || "Error al iniciar sesión",
        data: fields,
        Errors: {
          identifier: [data.errorIdentifier],
          password: [data.errorPassword],
        },
      };
    }

    console.log("Login exitoso:", data);
    // Aquí podrías guardar la sesión antes de redirigir
  } catch (error) {
    return {
      success: false,
      message: "Error de conexión",
      data: fields,
      Errors: {
        identifier: ["No se pudo conectar al servidor"],
      },
    };
  }

  redirect("/");
}
