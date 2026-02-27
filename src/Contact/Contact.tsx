import React, { useState } from "react";
import { BiSolidMessageAltError } from "react-icons/bi";

// Data required in form
type ContactData = {
	name: string;
	email: string;
	message: string;
	isChecked?: boolean | string;
};

export default function Contact() {
	// Form data secured with ContactData type
	// Form data is empty by default
	const [formData, setFormData] = useState<ContactData>({
		name: "",
		email: "",
		message: "",
	});

	// Errors messages
	const [errors, setErrors] = useState<Partial<ContactData>>({});

	// Accept or not data management policy
	// By default data policy is not accepted
	const [isChecked, setIsChecked] = useState<boolean>(false);

	// --- UPDATE VALUES IN FORM ---
	const handleChange = (e: any) => {
		// Get the value and the input name from event
		const { name, value } = e.target;

		// Update formData with the new value in the input targeted
		setFormData((formData) => ({
			...formData, // previous data in form data
			[name]: value,
		}));
	};

	// --- HANDLE FORM SUBMIT ---
	const handleSubmit = (e: any) => {
		// Stop the default settings of form
		e.preventDefault();

		// Clear errors state with empty object
		setErrors({});

		// Empty object to handle error message
		// Partial makes optional the types required in ContactData
		let errorMessage: Partial<ContactData> = {};

		// Clean data from form
		const name = formData.name.trim();
		const email = formData.email.trim();
		const message = formData.message.trim();

		// Checking if the name field is valid
		if (name.length === 0) {
			errorMessage.name = "Le champ nom est vide.";
		}

		// Checking if the email is valid
		if (email.length === 0) {
			errorMessage.email = "Le champ email est vide.";
		}

		// Checking if the field message is valid
		if (message.length === 0) {
			errorMessage.message = "Le champ message est vide.";
		}

		// Checking that data management policy is accepted
		if (!isChecked) {
			errorMessage.isChecked = "Vous devez accepter la politique.";
		}

		// Update the state of error only if there is an error
		// Stop the code
		if (Object.keys(errorMessage).length > 0) {
			setErrors(errorMessage);
			return;
		}

		// Empty form after form submit
		setFormData({
			name: "",
			email: "",
			message: "",
		});

		// Put isChecked to its initial state
		setIsChecked(false);
	};

	// --- HANDLE CHECKED ---
	const handleChecked = (e: any) => {
		setIsChecked(e.target.checked);
	};

	// --- SHOW ERROR MESSAGES ---
	const showErrors = () => {
		return Object.values(errors).map((msg, i) => (
			<div
				key={i}
				className="flex justify-between items-center gap-2 border rounded-full py-2 px-4 text-xs"
			>
				<span>{msg}</span>
				<BiSolidMessageAltError />
			</div>
		));
	};

	return (
		<section className="flex flex-col gap-2 items-center justify-center max-w-2/3 mx-auto">
			<h1
				className="
                    text-h1-mobile italic uppercase font-bold text-white drop-shadow-title-glow 
                    md:text-h1-tablet
                    lg:text-h1-desktop
                "
			>
				Contact
			</h1>
			<form
				className="
                    text-p-mobile bg-green-dark text-white p-4 rounded-lg border-green-light border-3 border-green-light
                    md:text-p-tablet
                    "
			>
				<fieldset>
					<div className="flex flex-col gap-4 ">
						{/* Name field */}
						<input
							type="text"
							placeholder="Nom"
							value={formData.name}
							onChange={handleChange}
							name="name"
							className="bg-black-dark py-2 px-4 rounded-full"
						/>

						{/* Mail field */}
						<input
							type="email"
							placeholder="mail@mail.com"
							value={formData.email}
							onChange={handleChange}
							name="email"
							className="bg-black-dark py-2 px-4 rounded-full"
						/>

						{/* Message field */}
						<textarea
							placeholder="Votre message"
							value={formData.message}
							onChange={handleChange}
							name="message"
							className="bg-black-dark py-2 px-4 rounded-lg h-[150px]"
						/>

						{/* Data management policy */}
						<div className="flex items-center justify-center gap-6">
							<input
								type="checkbox"
								checked={isChecked}
								onChange={handleChecked}
							/>
							<span>J'accepte la politique de confidentialité.</span>
						</div>

						<button
							className="text-sm bg-green-light py-2 px-10 rounded-full uppercase font-bold max-w-2/3 mx-auto"
							type="submit"
							onClick={handleSubmit}
						>
							Valider
						</button>
					</div>
				</fieldset>
			</form>

			{/* Error messages if existing */}
			{Object.keys(errors).length > 0 && (
				<div className="flex flex-col gap-2">{showErrors()}</div>
			)}
		</section>
	);
}
