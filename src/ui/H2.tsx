import type { ReactNode } from "react";

type H2Props = {
  children: ReactNode;
};

export default function H2({ children }: H2Props) {
  return (
    <h2
      className="
        text-h2-mobile pt-h2-spacing text-white font-semibold
        md:text-h2-tablet
        lg:text-h2-desktop
      ">
      {children}
    </h2>
  );
}
