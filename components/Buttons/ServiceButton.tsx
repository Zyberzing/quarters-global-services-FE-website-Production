import React from 'react';

interface ServiceButtonProps {
  name: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

export default function ServiceButton({
  name,
  leftIcon,
  rightIcon,
  onClick,
}: ServiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative cursor-pointer overflow-hidden w-[163px] h-[47px] opacity-100 gap-[10px] px-[16px] py-[10px] rounded-[36px] border border-[#EBEBEB] flex items-center justify-between group"
    >
      {/* Sliding black background */}
      <span className="absolute inset-0 bg-black rounded-[36px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out z-0" />

      {/* Content */}
      {leftIcon && <span className="z-10">{leftIcon}</span>}
      <span className="flex-1 text-center z-10 text-black group-hover:text-white transition-colors duration-300">{name}</span>
      {rightIcon && <span className="z-10">{rightIcon}</span>}
    </button>
  );
}
