export type InputProps = {
<<<<<<< HEAD
    type?: "text" | "email" | "checkbox" | "password" | "url";
    isTextArea?: boolean;
    placeholder?: string;
    onChange : (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    checked? : boolean;
    value?: string;
    name?: string;
    width?: string;
}
=======
  type?: React.HTMLInputTypeAttribute;
  isTextArea?: boolean;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  checked?: boolean;
  value?: string;
  name?: string;
  width?: string;
};
>>>>>>> dev
