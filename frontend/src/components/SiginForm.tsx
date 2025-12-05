"use client";

import Link from "next/link";
import FormError from "./FormError";
import { actions } from "@/actions";
import { useActionState } from "react";
import { type FormState } from "@/validations/sign";

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  data: {
    email: "",
    password: "",
  },
  Errors: null,
};

export default function SiginForm() {
  const [formState, formAction] = useActionState(
    actions.auth.registerUserAction,
    INITIAL_STATE
  );

  return (
    <form
      className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      action={formAction}
    >
      <fieldset className="fieldset">
        <label className="label">Email</label>
        <input
          className="input validator"
          name="username"
          type="text"
          placeholder="username"
          defaultValue={formState.data?.username ?? ""}
          required
        />
        <FormError error={formState.Errors?.username} />
      </fieldset>

      <label className="fieldset">
        <span className="label">Password</span>
        <input
          className="input validator"
          name="password"
          type="password"
          placeholder="Password"
          defaultValue={formState.data?.password ?? ""}
          required
        />
        <FormError error={formState.Errors?.password} />
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
