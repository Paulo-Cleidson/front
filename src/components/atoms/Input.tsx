import React from "react";

type InputProps = {
  label: string;
  value?: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  name: string;
};

const Input: React.FC<InputProps> = ({ label, value, onChange, type = "text", placeholder , name  }) => {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name={name}
      />
    </div>
  );
};

export default Input;
