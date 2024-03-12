import ReactSelect from "react-select";

type Props = {
  label: string;
  disabled: boolean;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: {
    value: string;
    label: string | null;
  }[];
};

function Select({ label, disabled, value, onChange, options }: Props) {
  return (
    <div className="z-[100]">
      <label className="block text-sm text-gray-900 font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isMulti
          value={value}
          options={options}
          onChange={onChange}
          isDisabled={disabled}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
}

export default Select;
