"use client";
import SiginForm from "@/components/SiginForm";

export default function page() {
  return (
    <>
      <div className="flex items-center min-h-screen justify-center flex-col gap-y-10">
        <h1 className="text-5xl">Note APP</h1>
        <SiginForm />
      </div>
    </>
  );
}
