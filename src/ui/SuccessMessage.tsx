import { FaCircleCheck } from "react-icons/fa6";
import type { SuccessMessageProps } from "../types/messages";

export default function SuccessMessage({ success }: SuccessMessageProps) {

    // Check if the object contain keys
    if (!success) return null;

    return (
        <div
            className="fixed left-0 top-40 flex gap-2 border-2 border-green-light rounded-r-full py-2 px-4 text-xs bg-green-medium"
        >
            <p>{success}</p>
            <FaCircleCheck />
        </div>

    )
}
