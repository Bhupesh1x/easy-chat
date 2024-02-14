import Image from "next/image";

import AuthForm from "./_components/AuthForm";

export default function Page() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-100">
      <div className="mx-auto">
        <Image
          src="/images/logo.png"
          alt="logo"
          height="48"
          width="48"
          className="mx-auto w-auto"
        />
        <h1 className="mt-6 text-3xl text-gray-800 font-bold tracking-tight text-center">
          Sign in to your account
        </h1>
      </div>
      <AuthForm />
    </div>
  );
}
