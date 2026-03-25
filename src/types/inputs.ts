export type InputProps = {
    type?: React.HTMLInputTypeAttribute;
    isTextArea?: boolean;
    placeholder?: string;
    onChange? : (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    checked? : boolean;
    value?: string;
    name?: string;
    width?: string;
    readOnly?: boolean;
    disabled?: boolean;
}
