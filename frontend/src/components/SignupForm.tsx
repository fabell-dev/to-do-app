"use client";

import Link from "next/link";
import FormError from "./FormError";
import { actions } from "@/actions";
import { useActionState, useEffect, useState } from "react";
import { type FormState, SignupFormSchema } from "@/validations/sign";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  data: {
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  },
  Errors: null,
};

export default function SignupForm() {
  const [formState, formAction] = useActionState(
    actions.auth.registerUserAction,
    INITIAL_STATE
  );

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, { hasError: boolean; message?: string }>
  >({});
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const validateField = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // Validar campo individual
    try {
      const fieldSchema =
        SignupFormSchema.shape[field as keyof typeof SignupFormSchema.shape];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setFieldErrors((prev) => ({
          ...prev,
          [field]: { hasError: false, message: undefined },
        }));
      }
    } catch (error: any) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: {
          hasError: true,
          message: error.issues?.[0]?.message || "Error de validación",
        },
      }));
    }

    // Validar contraseñas coincidentes en tiempo real
    if (field === "password" || field === "cpassword") {
      const passwordValue = field === "password" ? value : updatedData.password;
      const cpasswordValue =
        field === "cpassword" ? value : updatedData.cpassword;

      if (cpasswordValue && passwordValue !== cpasswordValue) {
        setFieldErrors((prev) => ({
          ...prev,
          cpassword: {
            hasError: true,
            message: "Passwords don't match",
          },
        }));
      } else if (cpasswordValue && passwordValue === cpasswordValue) {
        setFieldErrors((prev) => ({
          ...prev,
          cpassword: { hasError: false, message: undefined },
        }));
      }
    }
  };

  //Cambiar nombre de clase si encuentra error
  const getInputClass = (field: string) => {
    if (formState.Errors?.[field as keyof typeof formState.Errors]) {
      return "input input-error";
    }
    if (fieldErrors[field]?.hasError) {
      return "input input-error";
    }
    return "input";
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
    <>
      <div className="flex items-center min-h-screen justify-center flex-col gap-y-10">
        <h1 className="text-5xl">Note APP</h1>
        <form
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
          action={formAction}
        >
          {/* NAME */}
          <label className="label">Nombre (opcional)</label>
          <input
            type="text"
            className={getInputClass("name")}
            placeholder="Jhon Doe"
            name="name"
            defaultValue={formState.data?.name ?? ""}
            onChange={(e) => validateField("name", e.target.value)}
          />
          <FormError error={getFieldError("name")} />

          {/* USERNAME */}
          <label className="label">Usuario</label>
          <input
            type="text"
            className={getInputClass("username")}
            placeholder="JhonDoe2002"
            name="username"
            defaultValue={formState.data?.username ?? ""}
            onChange={(e) => validateField("username", e.target.value)}
            required
          />
          <FormError error={getFieldError("username")} />

          {/* EMAIL */}
          <label className="label">Email</label>
          <input
            type="email"
            className={getInputClass("email")}
            placeholder="Email"
            name="email"
            defaultValue={formState.data?.email ?? ""}
            onChange={(e) => validateField("email", e.target.value)}
            required
          />
          <FormError error={getFieldError("email")} />

          <label className="fieldset">
            <span className="label">Password</span>
            <input
              type="password"
              className={getInputClass("password")}
              placeholder="Password"
              name="password"
              defaultValue={formState.data?.password ?? ""}
              onChange={(e) => validateField("password", e.target.value)}
              required
            />
            <FormError error={getFieldError("password")} />
          </label>
          <label className="fieldset">
            <span className="label">Confirm Password</span>
            <input
              type="password"
              className={getInputClass("cpassword")}
              placeholder="Confirm Password"
              name="cpassword"
              defaultValue={formState.data?.cpassword ?? ""}
              onChange={(e) => validateField("cpassword", e.target.value)}
              required
            />
            <FormError error={getFieldError("cpassword")} />
          </label>

          <button className="btn btn-neutral mt-4" type="submit">
            Login
          </button>
          <p className="mt-1 justify-self-center textarea-xs">
            Ya tengo una cuenta
            <Link className="text-blue-500 ml-1" href="/signin">
              Iniciar Sesion
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
