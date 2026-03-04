 export type InputProps = {
    type: "text" | "email" | "checkbox" | "password";
    placeholder?: string;
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
    checked? : boolean;
    value?: string;
    name: string;
}