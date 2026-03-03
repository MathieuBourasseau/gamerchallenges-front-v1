import React from 'react'

type ButtonProps = {
    label: string;
    type: "button" | "submit"
    bgColor?: string;
    borderColor?: string;
    rounded?: string;
    padding?: string;
    margin?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
    label,
    type,
    bgColor = "bg-green-medium",
    borderColor = "border-green-medium",
    rounded = "rounded-full",
    padding = "py-2 px-10",
    margin = "",
    onClick
} : ButtonProps) {

    return (
        <button
            className={`
                text-sm ${bgColor} ${padding} ${margin} ${rounded} cursor-pointer uppercase font-bold max-w-2/3 mx-auto border-2 ${borderColor}
                hover:bg-white hover:text-green-light hover:border-green-light
                md:text-base
                `}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
