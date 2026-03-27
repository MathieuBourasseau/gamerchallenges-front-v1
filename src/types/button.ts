export type ButtonProps = {
  label: string;
  type: "button" | "submit";
  className?: string;
  active?: boolean; 
  bgColor?: string;
  borderColor?: string;
  rounded?: string;
  padding?: string;
  margin?: string;
  width?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};