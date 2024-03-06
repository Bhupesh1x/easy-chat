"use client";

import axios from "axios";
import { toast } from "sonner";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import MessageInput from "./MessageInput";

import useConversation from "@/hooks/use-conversations";

function MessageFormFooter() {
  const { conversationId } = useConversation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setValue("message", "", { shouldValidate: true });
    try {
      await axios.post("/api/messages", {
        ...values,
        conversationId,
      });
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  return (
    <div className="px-4 py-4 flex items-center gap-2 border-t bg-white lg:gap-4 w-full">
      <HiPhoto
        size={28}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center gap-2 lg:gap-4"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message..."
        />
        <button
          type="submit"
          className="bg-sky-500 rounded-full p-2 hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}

export default MessageFormFooter;
