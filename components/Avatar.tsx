import Image from "next/image";

type Props = {
  imageSrc: string | null;
};

function Avatar({ imageSrc }: Props) {
  return (
    <div className="relative">
      <div className="relative inline-block overflow-hidden rounded-full h-9 w-9 md:h-11 md:w-11">
        <Image src={imageSrc || "/images/placeholder.jpg"} alt="Avatar" fill />
      </div>
      <span className="absolute bg-green-500 h-2 w-2 md:h-3 md:w-3 top-0 right-0 rounded-full block ring-2 ring-white" />
    </div>
  );
}

export default Avatar;
