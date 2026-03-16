import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { loginUser, registerUser } from "../../Services/authService";

// UI Components
import SuccessMessage from "../../ui/SuccessMessage";
import Input from "../../ui/Input";
import ErrorSummary from "../../ui/ErrorSummary";
import Button from "../../ui/Button";

// Auth
import { AuthContext } from "../../Context/AuthContext";

// Types
import type {
  LoginFormData,
  RegisterFormData,
  FormErrors,
} from "../../types/forms";

type FormAuthProps = {
  mode: "login" | "register";
};

export default function FormAuth({ mode }: FormAuthProps) {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Form state
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>(
    mode === "login"
      ? { email: "", password: "" }
      : {
          email: "",
          username: "",
          password: "",
          acceptPolicy: false,
          avatar: null,
        },
  );

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [errors, setErrors] = useState<
    FormErrors<LoginFormData> | FormErrors<RegisterFormData>
  >({});

  const [success, setSuccessMessage] = useState<string>("");

  // Reset form when mode changes
  useEffect(() => {
    if (mode === "login") {
      setFormData({ email: "", password: "" });
    } else {
      setFormData({
        email: "",
        username: "",
        password: "",
        acceptPolicy: false,
        avatar: null,
      });
    }

    setErrors({});
    setSelectedFileName("");
    setPreviewUrl(null);
  }, [mode]);

  // Handle text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFormData({ ...formData, avatar: file });

    if (file) {
      setSelectedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle checkbox
  const handleCheckbox = () => {
    if (mode === "register") {
      setFormData({
        ...formData,
        acceptPolicy: !(formData as RegisterFormData).acceptPolicy,
      });
    }
  };

  // Validation
  const validate = () => {
    const newErrors: any = {};

    if (!formData.email) newErrors.email = "Email obligatoire.";
    if (!formData.password) newErrors.password = "Mot de passe obligatoire.";

    if (mode === "register") {
      const data = formData as RegisterFormData;

      if (!data.username) newErrors.username = "Nom d'utilisateur obligatoire.";
      if (!data.acceptPolicy)
        newErrors.isChecked = "Vous devez accepter la politique.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      if (mode === "login") {
        const data = await loginUser(formData as LoginFormData);

        // 🟩 Correction : on utilise le contexte
        login({
          token: data.token,
          userId: data.user.id,
        });

        navigate("/mon-compte");
      } else {
        await registerUser(formData as RegisterFormData);

        setSuccessMessage("Inscription réussie !");
        setTimeout(() => {
          navigate("/auth?mode=login");
        }, 2000);
      }
    } catch (err: any) {
      setErrors({ server: err.message });
    }
  };

  return (
    <>
      <SuccessMessage success={success} />

      <form
        onSubmit={handleSubmit}
        className="
          auth-form border-2 border-green-light rounded-2xl sm:rounded-3xl md:rounded-4xl
          px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 md:pt-12 pb-6 sm:pb-8
          flex flex-col gap-4 sm:gap-5 md:gap-6
          w-full max-w-sm sm:max-w-md bg-green-medium/25
        ">
        {/* Email */}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email ?? ""}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="error text-xs sm:text-sm">{errors.email}</p>
        )}

        {/* Username */}
        {mode === "register" && (
          <>
            <Input
              type="text"
              name="username"
              placeholder="Pseudo"
              value={(formData as RegisterFormData).username ?? ""}
              onChange={handleChange}
            />
            {(errors as FormErrors<RegisterFormData>).username && (
              <p className="error text-xs sm:text-sm">
                {(errors as FormErrors<RegisterFormData>).username}
              </p>
            )}
          </>
        )}

        {/* Password */}
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password ?? ""}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="error text-xs sm:text-sm">{errors.password}</p>
        )}

        {/* Avatar */}
        {mode === "register" && (
          <>
            <label
              htmlFor="avatar"
              className="
                bg-green-medium text-white px-4 sm:px-6 py-2 sm:py-2.5
                rounded-full border-2 border-green-medium
                uppercase font-bold text-xs sm:text-sm cursor-pointer text-center
                transition-colors hover:bg-white hover:text-green-light hover:border-green-light
              ">
              Choisir un avatar
            </label>

            <input
              id="avatar"
              type="file"
              name="avatar"
              className="hidden"
              onChange={handleFileChange}
            />

            {selectedFileName && (
              <p className="text-xs sm:text-sm text-white opacity-80 text-center">
                Fichier sélectionné : {selectedFileName}
              </p>
            )}

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Aperçu de l'avatar"
                className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mx-auto border-2 border-green-light"
              />
            )}
          </>
        )}

        {/* Accept policy */}
        {mode === "register" && (
          <>
            <label className="flex items-start sm:items-center gap-2 sm:gap-3 w-full cursor-pointer">
              <Input
                type="checkbox"
                name="acceptPolicy"
                checked={(formData as RegisterFormData).acceptPolicy ?? false}
                onChange={handleCheckbox}
                width="w-auto mt-1 sm:mt-0"
              />
              <span className="text-white text-xs sm:text-sm leading-snug">
                J'accepte la politique de confidentialité
              </span>
            </label>
            {errors.isChecked && (
              <p className="error text-xs sm:text-sm">{errors.isChecked}</p>
            )}
          </>
        )}

        {/* Server error */}
        {errors.server && (
          <p className="error text-xs sm:text-sm">{errors.server}</p>
        )}

        {/* Submit */}
        <Button
          label={mode === "login" ? "Se connecter" : "Valider l'inscription"}
          type="submit"
        />
      </form>

      <ErrorSummary errors={errors} />
    </>
  );
}
