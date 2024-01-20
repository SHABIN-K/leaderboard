import React, { ChangeEvent } from "react";

interface FormInputProps {
  mainClass: string;
  label?: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  classLabel?: string;
  classInput?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  mainClass,
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  autoComplete,
  classLabel,
  classInput,
}) => {
  return (
    <div className={mainClass}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autoComplete}
        className={classInput}
      />
      <label className={classLabel}>{label}</label>
    </div>
  );
};

export default FormInput;
