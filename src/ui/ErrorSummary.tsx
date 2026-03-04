import React from 'react'
import { BiSolidMessageAltError } from "react-icons/bi";

type ErrorSummaryProps = {
    errors: Record<string, string>;
}

export default function ErrorSummary({errors} : ErrorSummaryProps) {



    return Object.values(errors).map((msg, i) => (
        <div
            key={i}
            className="flex justify-between items-center gap-2 border-2 border-red-dark bg-red-medium rounded-r-full py-2 px-4 text-xs"
        >
            <span>{msg}</span>
            <BiSolidMessageAltError />
        </div>
    ))
}
