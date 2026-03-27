import type { ReactNode } from "react"

type BaseTitlesProps = {
    children?: ReactNode;
}

type H1Props = {
    flex?: string;
}

export type H2Props = {
  children: ReactNode;
};

export type H1TitleProps = BaseTitlesProps & H1Props;

