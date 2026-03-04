import type { InputProps } from "../types/inputs"

// type, isTextArea and checked are isolated props from the others props because they are not common to textarea and input
export default function Input({ type, isTextArea, checked, width ="w-full", ...rest } : InputProps) {

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
            className={`bg-black-dark py-2 px-4 rounded-full ${width}`}
        />
    )
};
