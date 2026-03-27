import type { ButtonProps } from "../types/button";

export default function Button({
  label,
  type,
  className,
  active = false, 
  bgColor = "bg-green-medium",
  borderColor = "border-green-medium",
  rounded = "rounded-full",
  padding = "py-2 px-6", 
  width = "w-auto",
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`
        text-sm ${padding} ${rounded} cursor-pointer uppercase font-bold ${width} mx-auto border-2
        md:text-base
        hover:bg-white hover:text-green-light hover:border-green-light

        ${
          active
            ? "bg-green-dark text-white border-4 border-green-light" // style actif
            : `${bgColor} text-white ${borderColor}` 
        }

        ${className || ""}
      `}
      type={type}
      onClick={onClick}>
      {label}
    </button>
  );
}
