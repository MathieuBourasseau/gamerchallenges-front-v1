import type { InputProps } from "../types/inputs";

// type, isTextArea and checked are isolated props from the others props because they are not common to textarea and input
export default function Input({
  type,
  isTextArea,
  checked,
  width = "w-full"
  readOnly,
  ...rest
}: InputProps) {
  return isTextArea ? (
    <textarea
      {...rest}
      className="bg-black-dark py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-lg md:rounded-xl h-[120px] sm:h-[140px] md:h-[150px] w-full text-xs sm:text-sm md:text-base"
    />
  ) : (
    <input
      type={type} // include type for input
      {...(type === "checkbox" ? { checked } : {})} // only include checked if it's a checkbox
      {...rest}
      className={`bg-black-dark py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-full ${width} text-xs sm:text-sm md:text-base`}
    />
  );
}
