import { BiSolidMessageAltError } from "react-icons/bi";
import type { ErrorSummaryProps } from "../types/messages";

export default function ErrorSummary({ errors }: ErrorSummaryProps) {

    // Transform the keys and values into an array
    const errorEntries = Object.entries(errors);

    // Filter to keep only the message without code
    const visibleErrors = errorEntries.filter(([key, value]) => {
        return key !== 'statusCode' && typeof value === 'string' && value.length > 0;
    });

    if (visibleErrors.length === 0) return null;

    return (
        <div className="fixed left-0 top-10 flex flex-col items-start gap-2">
            {visibleErrors.map(([key, msg], i) => (
                <div
                    key={key || i}
                    className="flex justify-between items-center gap-2 border-2 border-red-dark bg-red-medium rounded-r-full py-2 px-4 text-xs text-white"
                >
                    <span>
                        {key === "server" && errors.statusCode ? `Erreur ${errors.statusCode} - ` : "" }
                        {msg}
                    </span>
                    <BiSolidMessageAltError />
                </div>
            ))}
        </div>
    )
}