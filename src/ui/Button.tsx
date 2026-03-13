import React from "react";

type ButtonProps = {
  label: string;
  type: "button" | "submit";
  className?: string;
  active?: boolean; // permet d'activer un style différent (onglets login/register)
  bgColor?: string;
  borderColor?: string;
  rounded?: string;
  padding?: string;
  margin?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Button({
  label,
  type,
  className,
  active = false, // valeur par défaut
  bgColor = "bg-green-medium",
  borderColor = "border-green-medium",
  rounded = "rounded-full",
  padding = "py-2 px-6", // j'ai réduit le padding horizontal pour centrer le bouton
  margin = "",
  width = "w-auto", // largeur auto pour que le bouton s'adapte au texte
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`
        text-sm ${padding} ${margin} ${rounded} cursor-pointer uppercase font-bold ${width} mx-auto border-2
        md:text-base
        hover:bg-white hover:text-green-light hover:border-green-light

        ${
          active
            ? "bg-green-dark text-white border-4 border-green-light" // style actif
            : `${bgColor} text-white ${borderColor}` // style normal
        }

        ${className || ""}
      `}
      type={type}
      onClick={onClick}>
      {label}
    </button>
  );
}
