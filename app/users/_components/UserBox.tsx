"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { User } from "@prisma/client";

import Avatar from "@/components/Avatar";

type Props = {
  user: User;
};

function UserBox({ user }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await axios.post("/api/conversations", { userId: user.id });
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [user.id]);

  return (
    <div
      className="relative flex items-center gap-x-1 space-x-3 bg-white hover:bg-gray-100 transition rounded-lg p-2 cursor-pointer"
      onClick={handleClick}
    >
      <Avatar imageSrc={user?.image} />
      <p className="text-sm font-medium text-gray-900">{user.name}</p>
    </div>
  );
}

export default UserBox;
