import type { ReactNode } from "react"

type BaseTitlesProps = {
    children?: ReactNode;
}

type H1Props = {
    size: "h1-mobile" | "h1-tablet" | "h1-desktop"
}

type H2Props = {
    size: "h2-mobile" | "h2-tablet" | "h2-desktop"
}

export type H1TitleProps = BaseTitlesProps & H1Props;
export type H2TitlesProps = BaseTitlesProps & H2Props;
