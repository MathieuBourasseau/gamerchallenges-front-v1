import { useState, useEffect, useRef, useContext } from "react";
import type { ChangeEvent } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SuccessMessage from "../../ui/SuccessMessage";
import H1Title from "../../ui/H1Title";
import { AuthContext } from "../../Context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import ChangePasswordModal from "./ChangePasswordModal.tsx";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";

type UserForm = {
  username: string;
  email: string;
  favouriteGame: string;
  twitch: string;
  youtube: string;
  discord: string;
  avatar: File | null;
};

export default function MyAccount() {
  const navigate = useNavigate();
  // Get token from AuthContext to authenticate API calls
  const { token } = useContext(AuthContext);

  // Get user profile data from useAuth hook (fetches from /me endpoint)
  const { userInfo, loadingUser, refreshUser } = useAuth();

  const [form, setForm] = useState<UserForm>({
    username: "",
    email: "",
    favouriteGame: "",
    twitch: "",
    youtube: "",
    discord: "",
    avatar: null,
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  // 1. Initialisation de l'erreur au format objet
  const [error, setError] = useState<Partial<ApiErrorResponse>>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [avatarName, setAvatarName] = useState("Aucun fichier choisi");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Fill form when userInfo is true
  useEffect(() => {
    if (userInfo) {
      setForm({
        username: userInfo.username || "",
        email: userInfo.email || "",
        favouriteGame: userInfo.favouriteGame || "",
        twitch: userInfo.twitch || "",
        youtube: userInfo.youtube || "",
        discord: userInfo.discord || "",
        avatar: null,
      });

      if (userInfo.avatar) {
        const parts = userInfo.avatar.split("/");
        setAvatarName(parts[parts.length - 1]);
      }
    }
  }, [userInfo]);

  // Form fields
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Avatar
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, avatar: file }));
      setAvatarName(file.name);
    }
  };

  // PATCH /me
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;

    // Clear errors and messages
    setError({});
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("favouriteGame", form.favouriteGame);
    formData.append("twitch", form.twitch);
    formData.append("youtube", form.youtube);
    formData.append("discord", form.discord);

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      // Throw error data if response fails
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      await refreshUser();

      setSuccessMessage("Profil mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(""), 3000);
      setEditingField(null);

    } catch (err: any) {

      console.error("Error updating user:", err);
      setError({
        statusCode: err.status || 500,
        server: err.error || "Impossible de mettre à jour le profil."
      });
    }

  };

  // DELETE /me
  const handleDeleteAccount = async () => {
    if (!token) return;

    try {
      setIsDeleting(true);
      setError({}); 

      const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw errorData;
      }

      setSuccessMessage("Votre compte a été supprimé avec succès !");
      setTimeout(() => navigate("/"), 2000);
    } catch (err: any) {
      console.error("Erreur lors de la suppression du compte:", err);
      setError({
        statusCode: err.status || 500,
        server: err.error || "Impossible de supprimer le compte."
      });
    } finally {
      setIsDeleting(false);
      setShowConfirmDelete(false);
    }
  };

  // writting fields form
  const renderField = (
    label: string,
    name: keyof UserForm,
    type: React.HTMLInputTypeAttribute = "text",
  ) => {
    const isEditing = editingField === name;

    return (
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full">
        <label className="sm:w-40 text-sm">{label}</label>
        <div className="flex w-full gap-2">
          <Input
            type={type}
            name={name}
            value={form[name] ?? ""}
            onChange={handleChange}
            width="flex-1"
            disabled={!isEditing}
          />
          <button
            type="button"
            onClick={() => setEditingField(isEditing ? null : name)}
            className={`p-2 w-12 h-12 rounded-lg flex items-center justify-center
              ${isEditing ? "bg-green-700" : "bg-[#55CC03]"} 
              text-white hover:bg-green-800 transition-colors`}>
            <FaEdit className="text-black" />
          </button>
        </div>
      </div>
    );
  };

  if (loadingUser) return <p className="text-center mt-10">Chargement...</p>;
  if (!userInfo)
    return <p className="text-center mt-10">Utilisateur introuvable.</p>;

  return (
    <div className="flex flex-col items-center px-4 py-10">
      
      <SuccessMessage success={successMessage} />
      <ErrorSummary errors={error} />

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}

      <div className="w-full max-w-2xl mx-auto border-4 border-[#55CC03] rounded-3xl p-6 md:p-10 bg-[radial-gradient(ellipse_at_center,_rgba(40,80,50,0.8)_0%,_rgba(0,0,0,0.9)_100%)] mt-4">
        <H1Title>Mon compte — {userInfo.username}</H1Title>

        {/* Avatar preview */}
        {userInfo.avatar && (
          <div className="flex justify-center mb-6">
            <img
              src={userInfo.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-[#55CC03]"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Avatar upload */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full">
            <label className="sm:w-40 text-sm">Avatar</label>
            <div className="flex w-full gap-2">
              <Input
                type="text"
                value={form.avatar?.name ?? avatarName}
                readOnly
                width="flex-1"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 w-12 h-12 rounded-lg flex items-center justify-center bg-[#55CC03] text-white hover:bg-green-700 transition-colors">
                <FaEdit className="text-black" />
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {renderField("Pseudo", "username")}
          {renderField("Email", "email", "email")}

          <Button
            label="Modifier mon mot de passe"
            type="button"
            onClick={() => setShowPasswordModal(true)}
          />

          {renderField("Jeu préféré", "favouriteGame")}
          {renderField("Twitch", "twitch")}
          {renderField("YouTube", "youtube")}
          {renderField("Discord", "discord")}

          <div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
            <Button type="submit" label="Enregistrer mes infos" />

            <Button
              type="button"
              label="Supprimer mon compte"
              bgColor="bg-red-500"
              borderColor="border-red-500"
              onClick={() => setShowConfirmDelete(true)}
            />
          </div>

          {showConfirmDelete && (
            <div className="bg-red-100 border border-red-500 p-4 rounded-lg mt-4 flex flex-col gap-2">
              <p className="text-black">
                Êtes-vous sûr(e) de vouloir supprimer votre compte ?
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  label="Annuler"
                  onClick={() => setShowConfirmDelete(false)}
                  bgColor="bg-gray-300"
                  borderColor="border-gray-400"
                />
                <Button
                  type="button"
                  label={isDeleting ? "Suppression..." : "Confirmer"}
                  onClick={handleDeleteAccount}
                  bgColor="bg-red-500"
                  borderColor="border-red-500"
                  disabled={isDeleting}
                />
              </div>
            </div>
          )}
        </form>
      </div>

      <div className="mt-8 flex justify-center">
        <Link to="/">
          <Button label="Retour" type="button" />
        </Link>
      </div>
    </div>
  );
}