"use client";

import Link from "next/link";
import FormError from "./FormError";
import { actions } from "@/actions";
import { useActionState, useState } from "react";
import { SigninFormSchema, type SigninFormState } from "@/validations/sign";

const INITIAL_STATE: SigninFormState = {
  success: false,
  message: undefined,
  data: {
    identifier: "",
    password: "",
  },
  Errors: null,
};

export default function SiginForm() {
  const [formState, formAction] = useActionState(
    actions.auth.loginUserAction,
    INITIAL_STATE
  );

  const [visible, setVisible] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, { hasError: boolean; message?: string }>
  >({});

  const validatePassword = (value: string) => {
    // Validar solo la contraseña
    try {
      const fieldSchema = SigninFormSchema.shape.password;
      fieldSchema.parse(value);
      setFieldErrors((prev) => ({
        ...prev,
        password: { hasError: false, message: undefined },
      }));
    } catch (error: any) {
      setFieldErrors((prev) => ({
        ...prev,
        password: {
          hasError: true,
          message: error.issues?.[0]?.message || "Error de validación",
        },
      }));
    }
  };

  // Obtener errores del cliente y el servidor
  const getFieldError = (field: string) => {
    const serverError =
      formState.Errors?.[field as keyof NonNullable<typeof formState.Errors>];
    const clientError = fieldErrors[field]?.message;

    if (serverError && Array.isArray(serverError) && serverError.length > 0) {
      return serverError[0];
    }

    return clientError;
  };

  return (
    <form
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      action={formAction}
    >
      <fieldset className="fieldset">
        <label className="label">Usuario o Email</label>
        <input
          className="input"
          name="identifier"
          type="text"
          placeholder="usuario o email@ejemplo.com"
          defaultValue={formState.data?.identifier ?? ""}
          required
        />
        <FormError error={formState.Errors?.identifier} />
      </fieldset>

      <label className="fieldset">
        <span className="label">Password</span>
        <div className="flex items-center">
          <input
            className="input"
            name="password"
            type={visible ? "text" : "password"}
            placeholder="Password"
            defaultValue={formState.data?.password ?? ""}
            onChange={(e) => validatePassword(e.target.value)}
            required
          />
          <div
            className="pl-3"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? <EyeOpen /> : <EyeClose />}
          </div>
        </div>

        <FormError error={getFieldError("password")} />
      </label>

      <button className="btn btn-neutral mt-4" type="submit">
        Login
      </button>
      <p className="mt-1 justify-self-center textarea-xs">
        No tengo una cuenta{" "}
        <Link className="text-blue-500 ml-1" href="/signup">
          Crear Cuenta
        </Link>
      </p>
    </form>
  );
}

export function EyeOpen() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-eye-icon lucide-eye"
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </>
  );
}
export function EyeClose() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-eye-closed-icon lucide-eye-closed"
      >
        <path d="m15 18-.722-3.25" />
        <path d="M2 8a10.645 10.645 0 0 0 20 0" />
        <path d="m20 15-1.726-2.05" />
        <path d="m4 15 1.726-2.05" />
        <path d="m9 18 .722-3.25" />
      </svg>
    </>
  );
}
