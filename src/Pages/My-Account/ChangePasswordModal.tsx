import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

// Toast components
import ErrorSummary from "../../ui/ErrorSummary";
import SuccessMessage from "../../ui/SuccessMessage";

export default function ChangePasswordModal({ onClose }) {
  // Access the auth token from context
  const { token } = useContext(AuthContext);

  // Local form states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback messages
  const [error, setError] = useState(""); // Single error message
  const [success, setSuccess] = useState(""); // Success toast message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Send password update request to backend
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/me/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Auth token required
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        },
      );

      // If backend returns an error status
      if (!response.ok) throw new Error("Erreur serveur");

      // Show success message and close modal after a short delay
      setSuccess("Mot de passe modifié !");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      // Display generic error message
      setError("Impossible de modifier le mot de passe.");
    }
  };

  return (
    <>
      {/* Global toast messages */}
      <SuccessMessage success={success} />
      <ErrorSummary errors={error ? { general: error } : {}} />

      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-9999">
        {/* Modal container */}
        <div
          className="
            p-6 rounded-2xl w-full max-w-md relative border-4
            shadow-[0_0_20px_rgba(85,204,3,0.4)]
            text-white
          "
          style={{
            borderColor: "var(--color-green-light)",
            background: `
              radial-gradient(
                ellipse at center,
                rgba(40, 80, 50, 0.8) 0%,
                rgba(0, 0, 0, 0.95) 100%
              )
            `,
          }}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl font-bold transition-colors"
            style={{ color: "var(--color-green-light)" }}>
            ✕
          </button>

          {/* Modal title */}
          <h2
            className="text-2xl font-bold mb-4 drop-shadow"
            style={{
              color: "var(--color-green-light)",
              textShadow: "0 0 10px rgba(85, 204, 3, 0.7)",
            }}>
            Modifier mon mot de passe
          </h2>

          {/* Password change form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Old password field */}
            <Input
              type="password"
              placeholder="Ancien mot de passe"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            {/* New password field */}
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* Confirm new password field */}
            <Input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Action buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="button"
                label="Annuler"
                onClick={onClose}
                bgColor="bg-gray-600"
                borderColor="border-gray-500"
              />

              <Button type="submit" label="Valider" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
