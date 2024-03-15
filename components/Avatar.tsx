"use client";

import Image from "next/image";

import useActiveList from "@/hooks/use-active-list";

type Props = {
  imageSrc: string | null;
  email: string | null;
};

function Avatar({ imageSrc, email }: Props) {
  const { members } = useActiveList();
  const isActive = members.indexOf(email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:w-11">
        <Image src={imageSrc || "/images/placeholder.jpg"} alt="Avatar" fill />
      </div>
      {isActive && (
        <span className="absolute bg-green-500 h-2 w-2 md:h-3 md:w-3 top-0 right-0 rounded-full block ring-2 ring-white" />
      )}
    </div>
  );
}

export default Avatar;
