import React, { useState } from "react"
import type { ParticipationInputs, FormErrors } from "../../types/forms"
import { useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SuccessMessage from "../../ui/SuccessMessage";
import ErrorSummary from "../../ui/ErrorSummary";
import { validateParticipationForm } from "../../utils/validation";
import { shareParticipation } from "../../Services/fetchService";
import { useAuth } from "../../hooks/useAuth";


export default function ShareParticipation() {

  // --- STATES INITIALIZATION --- 
  const [formData, setFormData] = useState<ParticipationInputs>({
    title: "",
    url: ""
  });
  const [success, setSuccessMessage] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors<ParticipationInputs>>({});

  // --- NAVIGATION --- 
  const navigate = useNavigate();

  // --- USER DATA --- 
  const { userInfo, token } = useAuth();

  // Update value put in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    // Get name and value from event 
    const { name, value } = e.target;

    // update the form with current value and name 
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  // --- HANDLE FORM SUBMIT ---
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // Stop the default settings of form
    e.preventDefault();

    if (!token) {
      setErrors({ server: "Vous devez être connecté pour partager une vidéo." });
      return
    }

    // Clear errors state with empty object
    setErrors({});

    // Check if data are valid
    const result = validateParticipationForm(formData);

    // Update the state of error only if there is an error
    // Stop the code
    if (Object.keys(result).length > 0) {
      setErrors(result);
      return;
    }

    // --- FETCH DATA TO BACKEND ---
    try {

      const data = await shareParticipation(formData, token);

      // Show success message
      setSuccessMessage(data.message);

      // Hide success message after few seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 3000);

      // Empty form after form submit
      setFormData({
        title: "",
        url: "",
      });

      // create error if connection to server is broken
    } catch (error) {
      // Checking if the error is from instance Errror
      if (error instanceof Error) {
        setErrors({ server: error.message });
      } else {
        // If the error does not come from Error Instance
        setErrors({ server: "Une erreur de serveur est survenue." });
      }
      return;
    }
  };

  return (
    <section className="flex flex-col py-2 gap-2 items-center justify-center mx-auto h-full w-full">
      <form
        className="
                        flex flex-col gap-6 text-p-mobile bg-green-dark text-white p-4 my-2 rounded-2xl border-green-light border-2 border-green-light
                        md:text-p-tablet
                        lg:w-full lg:max-w-150
                        "
        onSubmit={handleSubmit}>
        <h1
          className="
                        text-h1-mobile italic uppercase font-bold text-white drop-shadow-title-glow text-center
                        md:text-h1-tablet
                        lg:text-h1-desktop
                    ">
          Partagez votre vidéo
        </h1>
        <fieldset
          className="w-full
                            lg:max-w-[80%] lg:mx-auto
                        ">
          <div className="flex flex-col gap-4 w-full">
            {/* Title input */}
            <Input
              type="text"
              placeholder="Titre de la vidéo"
              value={formData.title}
              onChange={handleChange}
              name="title"
            />

            {/* Url input */}

            <Input
              type="url"
              placeholder="https://votre-lien.com"
              value={formData.url}
              onChange={handleChange}
              name="url"
            />

            <Button label="Valider" type="submit" />
          </div>
        </fieldset>
      </form>

      <Button
        label="Retour à l'accueil"
        type="button"
        width="max-w-none"
        rounded="rounded-full"
        onClick={() => navigate("/")}
      />

      {/* Success message */}

      <SuccessMessage success={success} />

      {/* Error messages */}
      <ErrorSummary errors={errors} />
    </section>
  )
}
