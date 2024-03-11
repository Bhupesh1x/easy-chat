type Props = {
  danger?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
};

function Button({
  children,
  danger,
  disabled,
  fullWidth,
  onClick,
  secondary,
  type,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-70 disabled:cursor-not-allowed
      transition ${fullWidth && "w-full"} ${
        secondary ? "text-gray-900 hover:bg-gray-200" : "text-white"
      } ${
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:bg-rose-600"
      } ${
        !secondary &&
        !danger &&
        "bg-sky-500 hover:bg-sky-600 focus-visible:bg-sky-600"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;
