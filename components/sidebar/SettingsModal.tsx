"use client";

import axios from "axios";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { User } from "@prisma/client";

import Button from "../Button";
import Modal from "../modals/Modal";
import Input from "../inputs/Input";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
};

function SettingsModal({ isOpen, onClose, currentUser }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    try {
      await axios.post("/api/settings", values);
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="text-gray-900 font-semibold text-base leading-7">
            Profile
          </p>
          <p className="text-gray-500 leading-6 text-sm">
            Edit your public information
          </p>
          <div className="mt-10 flex flex-col gap-y-4">
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
              required
            />
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900 block">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-2">
                <Image
                  height="42"
                  width="42"
                  src={image || currentUser?.image || "/images/placeholder.jpg"}
                  alt="Avatar"
                  className="rounded-full"
                />
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  uploadPreset="easy-chat"
                >
                  <Button disabled={isLoading} secondary type="button">
                    Change
                  </Button>
                </CldUploadButton>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            secondary
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsModal;
