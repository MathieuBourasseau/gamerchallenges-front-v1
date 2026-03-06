import React from 'react'
import { BiSolidMessageAltError } from "react-icons/bi";
import type { ErrorSummaryProps } from "../types/messages";

export default function ErrorSummary({errors} : ErrorSummaryProps) {

    // Check if the object contain keys
    if(Object.keys(errors).length === 0) return null;

    return (
        <div
            className="fixed left-0 top-10 flex flex-col items-start gap-2"
        >
            {/* Transform key object into array */}
            {Object.values(errors).map((msg, i) => (
                <div
                    key={i}
                    className="flex justify-between items-center gap-2 border-2 border-red-dark bg-red-medium rounded-r-full py-2 px-4 text-xs text-white"
                >
                    <span>{msg}</span>
                    <BiSolidMessageAltError />
                </div>
            ))}
        </div>
    )
}
