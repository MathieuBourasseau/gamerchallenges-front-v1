import React from 'react'

type ButtonProps = {
    label: string;
    type: "button" | "submit"
    bgColor?: string;
    rounded: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ label, type, bgColor, rounded, onClick } : ButtonProps) {

    return (
        <button
            className={`
                text-sm ${bgColor} py-2 px-10 ${rounded} uppercase font-bold max-w-2/3 mx-auto
                md:text-base
                `}
            type={type}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
