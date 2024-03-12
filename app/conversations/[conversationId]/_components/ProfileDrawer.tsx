"use client";

import { format } from "date-fns";
import { IoTrash } from "react-icons/io5";
import { useMemo, useState } from "react";
import { Conversation, User } from "@prisma/client";

import useOtherUser from "@/hooks/use-other-user";

import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import RightModal from "@/components/modals/RightModal";

import ConfirmModal from "./ConfirmModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
};

function ProfileDrawer({ isOpen, onClose, data }: Props) {
  const otherUser = useOtherUser(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const joinedDate = useMemo(
    () => format(new Date(otherUser.createdAt), "PP"),
    [otherUser.createdAt]
  );

  const title = useMemo(
    () => data.name || otherUser.name,
    [data.name, otherUser.name]
  );

  const statusText = useMemo(() => {
    if (data?.isGroup) {
      return `${data?.users?.length} members`;
    }

    return "Active";
  }, [data?.isGroup, data?.users?.length]);

  return (
    <>
      <RightModal onClose={onClose} isOpen={isOpen}>
        <div className="relative mt-6 flex-1 px-4 dm:px-6">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {data?.isGroup ? (
                <AvatarGroup users={data.users} />
              ) : (
                <Avatar imageSrc={otherUser.image} />
              )}
            </div>
            <p>{title}</p>
            <p className="text-xs text-gray-500">{statusText}</p>

            <div className="mt-6 flex items-center justify-center">
              <div
                className="hover:opacity-85 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="h-10 w-10 bg-gray-100 flex items-center justify-center rounded-full">
                  <IoTrash size={20} />
                </div>
                <p className="text-sm font-light text-neutral-800 mt-2">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {!data?.isGroup && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {otherUser?.email}
                </dd>
              </div>
            )}

            {!data?.isGroup && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Joined</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <time dateTime={joinedDate}>{joinedDate}</time>
                </dd>
              </div>
            )}
          </div>
        </div>
      </RightModal>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ProfileDrawer;
