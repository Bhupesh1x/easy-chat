"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { User } from "@prisma/client";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import Input from "@/components/inputs/Input";
import Select from "@/components/inputs/Select";

type Props = {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
};

function GroupChatModal({ users, isOpen, onClose }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);

    try {
      await axios.post(`/api/conversations`, {
        ...values,
        isGroup: true,
      });

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="border-b border-gray-900/10 pb-10">
          <h4 className="text-base text-gray-900 font-semibold leading-7">
            Create a group chat
          </h4>
          <p className="text-sm leading-6 text-gray-500">
            Create a chat with more tha two people.
          </p>
          <div className="mt-8 flex flex-col gap-y-6">
            <Input
              required
              id="name"
              label="Name"
              errors={errors}
              register={register}
              disabled={isLoading}
            />

            <Select
              label="Members"
              disabled={isLoading}
              value={members}
              onChange={(value) =>
                setValue("members", value, {
                  shouldValidate: true,
                })
              }
              options={users?.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4 justify-end">
          <Button
            secondary
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;
