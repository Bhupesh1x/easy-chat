import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

function MobileItem({ href, label, icon: Icon, active, onClick }: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`group flex justify-center gap-x-3 p-4 text-sm leading-6 font-semibold w-full text-gray-500 hover:text-black hover:bg-gray-100 transition ${
        active && "text-black bg-gray-100"
      }`}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}

export default MobileItem;
