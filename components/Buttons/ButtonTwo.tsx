import React, { ReactNode } from "react";

interface ButtonProps {
  name: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right"; // optional prop, default to "left"
  link?: string; // optional link prop
}

const ButtonTwo: React.FC<ButtonProps> = ({
  name,
  icon,
  iconPosition = "left",
  link,
}) => {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank"); // open the link in a new tab
    }
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center px-4 py-2 rounded-full border border-[#D31021] bg-[#D31021] text-white font-semibold gap-2 hover:bg-[#D31021] transition-colors duration-200"
    >
      {icon && iconPosition === "left" && <span className="flex">{icon}</span>}
      <span>{name}</span>
      {icon && iconPosition === "right" && <span className="flex">{icon}</span>}
    </button>
  );
};

export default ButtonTwo;
