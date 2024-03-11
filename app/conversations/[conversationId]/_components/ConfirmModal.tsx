"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";

import useConversation from "@/hooks/use-conversations";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ConfirmModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { conversationId } = useConversation();

  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await axios.delete(`/api/conversations/${conversationId}`);

      onClose();
      router.push("/conversations");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-3">
        <div className="bg-red-100 h-12 w-12 sm:h-10 sm:w-10 flex items-center justify-center rounded-full flex-shrink-0">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-lg font-bold">Delete Conversation</p>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-row-reverse sm:mt-4 gap-4">
        <Button danger disabled={isLoading} onClick={handleDelete}>
          Delete
        </Button>
        <Button secondary disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
