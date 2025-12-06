"use server";
import { createUser } from "@/lib/usersOptions";
import { SignupFormSchema, type FormState } from "@/validations/sign";
import { z } from "zod";
import { redirect } from "next/navigation";

export async function registerUserAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
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
