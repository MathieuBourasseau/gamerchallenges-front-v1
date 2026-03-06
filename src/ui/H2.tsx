import type { Titles } from "../types/titles"

export default function H2 ({label} : Titles) {
    return (
        <h2
            className="
                text-h2-mobile pt-h2-spacing text-white
                md:text-h2-tablet
                lg:text-h2-desktop
                "  
        >
            {label}
        </h2>

    )
}
