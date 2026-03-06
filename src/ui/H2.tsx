import type { TitlesProps } from "../types/titles"

export default function H2 ({label} : TitlesProps) {
    return (
        <h2
            className="
                text-h2-mobile pt-h2-spacing text-white font-semibold
                md:text-h2-tablet
                lg:text-h2-desktop
                "  
        >
            {label}
        </h2>
    )
}
