import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
};

function MessageInput({
  id,
  type,
  register,
  errors,
  required,
  placeholder,
}: Props) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light bg-neutral-100 rounded-full px-4 py-2 focus:outline-none w-full"
      />
    </div>
  );
}

export default MessageInput;
