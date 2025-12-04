"use client";

import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

// Props interface
interface FormWrapperProps<T extends FieldValues> {
  control: Control<T>;
  title?: string;
  name: FieldPath<T>;
  type: string;
  placeholder?: string;
  require?: boolean;
  cssStyles?: string;
  disabled?: boolean;
}

const FormWrapper = <T extends FieldValues>({
  control,
  title,
  name,
  type,
  placeholder,
  require,
  cssStyles,
  disabled,
}: FormWrapperProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          {title && (
            <FormLabel className="text-black">
              {title} {require && <span className="text-red-500">*</span>}
            </FormLabel>
          )}

          <FormControl>
            <div className="bg-white border-2 h-14 rounded-xl relative">
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                className={`bg-transparent h-full text-xs md:text-sm shadow-none pr-10 ${
                  cssStyles || ""
                }`}
                disabled={disabled}
              />
              {isPasswordField && (
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default FormWrapper;