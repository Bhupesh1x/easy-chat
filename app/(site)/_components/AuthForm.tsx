"use client";

import axios from "axios";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import Input from "@/components/inputs/Input";

import AuthSocialButton from "./AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toogleVariant = useCallback(() => {
    setVariant((prev) => (prev === "LOGIN" ? "REGISTER" : "LOGIN"));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", values);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    if (variant === "LOGIN") {
      try {
        const callback = await signIn("credentials", {
          ...values,
          redirect: false,
        });

        if (callback?.error) {
          return toast.error("Invalid credentials");
        }

        if (callback?.ok) {
          return toast.success("Logged in success!");
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const socialAction = (action: string) => {
    console.log(action);
  };

  return (
    <div className="mt-8 sm:max-w-md w-full px-10 sm:px-0">
      <div className="bg-white px-4 py-8 rounded-lg shadow-md sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <Button fullWidth type="submit" disabled={isLoading}>
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative text-sm flex justify-center">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
          <div className="mt-6 flex justify-center text-sm gap-2 px-2 text-gray-500">
            <p>
              {variant === "LOGIN"
                ? "New to EasyChat?"
                : "Already have an account?"}
            </p>
            <p className="underline cursor-pointer" onClick={toogleVariant}>
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
