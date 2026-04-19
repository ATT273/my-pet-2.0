import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/libs/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cn("cursor-pointer p-2 rounded-md", className)}>
      {children}
    </button>
  );
};

export default Button;
