"use client";

import Link from "next/link";
import FormError from "./FormError";
import { actions } from "@/actions";
import { useActionState, useEffect } from "react";
import { type FormState } from "@/validations/sign";
import toast from "react-hot-toast";

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

  useEffect(() => {
    if (formState.Errors?.db) {
      toast.error(formState.Errors.db);
    }
  }, [formState]);

  return (
    <>
      <div className="flex items-center min-h-screen justify-center flex-col gap-y-10">
        <h1 className="text-5xl">Note APP</h1>
        <form
          className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
          action={formAction}
        >
          <label className="label">Nombre (opcional)</label>
          <input
            type="text"
            className="input validator"
            placeholder="Jhon Doe"
            name="name"
            defaultValue={formState.data?.name ?? ""}
          />
          <FormError error={formState.Errors?.name} />

          {/* USERNAME */}
          <label className="label">Usuario</label>
          <input
            type="text"
            className="input validator"
            placeholder="JhonDoe2002"
            name="username"
            defaultValue={formState.data?.username ?? ""}
            required
          />
          <FormError error={formState.Errors?.username} />
          <FormError error={formState?.Errors?.db} />

          {/* EMAIL */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input validator"
            placeholder="Email"
            name="email"
            defaultValue={formState.data?.email ?? ""}
            required
          />
          <FormError error={formState.Errors?.email} />

          <label className="fieldset">
            <span className="label">Password</span>
            <input
              type="password"
              className="input validator"
              placeholder="Password"
              name="password"
              defaultValue={formState.data?.password ?? ""}
              required
            />
            <FormError error={formState.Errors?.password} />
          </label>
          <label className="fieldset">
            <span className="label">Confirm Password</span>
            <input
              type="password"
              className="input validator"
              placeholder="Confirm Password"
              name="cpassword"
              defaultValue={formState.data?.cpassword ?? ""}
              required
            />
            <FormError error={formState.Errors?.cpassword} />
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
