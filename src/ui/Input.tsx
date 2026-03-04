import React from 'react'

type InputProps = {
    type?: "text" | "email" | "checkbox" | "password";
    isTextArea?: boolean;
    placeholder?: string;
    onChange : (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    checked? : boolean;
    value?: string;
    name: string;
}

// type, isTextArea and checked are isolated props from the others props because they are not common to textarea and input
export default function Input({ type, isTextArea, checked, ...rest } : InputProps) {

    return isTextArea ? (
        <textarea
            {...rest}
            className="bg-black-dark py-2 px-4 rounded-lg h-[150px] w-full"
        />
    ) : (
        <input
            type={type} // include type for input
            checked={checked} // include checked for input
            {...rest}
            className="bg-black-dark py-2 px-4 rounded-full w-full"
        />
    )
};
