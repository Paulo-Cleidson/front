import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const baseStyle = "px-6 py-4 rounded-lg font-medium transition";
  const styles = {
    primary: `${baseStyle} bg-blue-600 text-white hover:bg-blue-700`,
    secondary: `${baseStyle} bg-gray-200 text-gray-700 hover:bg-gray-300`,
  };

  return (
    <button type={type} onClick={onClick} className={styles[variant]}>
      {label}
    </button>
  );
};

export default Button;
