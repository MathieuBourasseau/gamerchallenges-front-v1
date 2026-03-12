import { useState, useEffect, ChangeEvent, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import SuccessMessage from "../../ui/SuccessMessage";
import H1Title from "../../ui/H1Title";

type User = {
	id: number;
	username: string;
	email: string;
	avatar?: string;
	favouriteGame?: string;
	twitch?: string;
	youtube?: string;
	discord?: string;
};

type UserForm = {
	username: string;
	email: string;
	favouriteGame: string;
	twitch: string;
	youtube: string;
	discord: string;
	avatar: File | null;
};

type MonCompteProps = {
	userId: number;
};

export default function MonCompte({ userId }: MonCompteProps) {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
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
	const [isDeleting, setIsDeleting] = useState(false);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false); // delete confirmation

	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Fetch user data
	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users/${userId}`,
				);
				if (!response.ok) throw new Error(`HTTP error ${response.status}`);
				const data: User = await response.json();

				setUser(data);
				setForm({
					username: data.username || "",
					email: data.email || "",
					favouriteGame: data.favouriteGame || "",
					twitch: data.twitch || "",
					youtube: data.youtube || "",
					discord: data.discord || "",
					avatar: null,
				});
			} catch (err) {
				console.error("Error fetching user:", err);
				setError("Impossible de récupérer les informations du compte.");
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [userId]);

	// Handle input changes
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	//  Handle file input changes (avatar)
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) setForm((prev) => ({ ...prev, avatar: file }));
	};

	// Submit updated user data
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("username", form.username);
		formData.append("email", form.email);
		formData.append("favouriteGame", form.favouriteGame);
		formData.append("twitch", form.twitch);
		formData.append("youtube", form.youtube);
		formData.append("discord", form.discord);
		if (form.avatar) formData.append("avatar", form.avatar);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${userId}`,
				{
					method: "PATCH",
					body: formData,
				},
			);

			if (!response.ok) throw new Error(`HTTP error ${response.status}`);
			const updatedUser: User = await response.json();

			setUser(updatedUser);
			setSuccessMessage("Profil mis à jour avec succès !");
			setTimeout(() => setSuccessMessage(""), 3000);
			setEditingField(null);
		} catch (err) {
			console.error("Error updating user:", err);
			setError("Impossible de mettre à jour le profil.");
		}
	};

	// Delete user account
	const handleDeleteAccount = async () => {
		try {
			setIsDeleting(true);
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/users/${userId}`,
				{
					method: "DELETE",
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `HTTP error ${response.status}`);
			}

			setSuccessMessage("Votre compte a été supprimé avec succès !");
			setTimeout(() => {
				navigate("/"); // redirection to home page after showing confirmation message
			}, 2000);
		} catch (err) {
			console.error("Erreur lors de la suppression du compte:", err);
			setError("Impossible de supprimer le compte.");
		} finally {
			setIsDeleting(false);
			setShowConfirmDelete(false);
		}
	};

	// Helper to render each form field with edit button
	const renderField = (
		label: string,
		name: keyof UserForm,
		type: string = "text",
	) => {
		const isEditing = editingField === name;
		return (
			<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full">
				<label className="sm:w-40 text-sm">{label}</label>
				<div className="flex w-full gap-2">
					<Input
						type={type}
						name={name}
						value={form[name]}
						onChange={handleChange}
						width="flex-1"
						disabled={!isEditing}
					/>
					<button
						type="button"
						onClick={() => setEditingField(isEditing ? null : name)}
						className={`p-2 w-12 h-12 rounded-lg flex items-center justify-center
            ${isEditing ? "bg-green-700" : "bg-[#55CC03]"} 
            text-white hover:bg-green-800 transition-colors`}
					>
						<FaEdit className="text-black" />
					</button>
				</div>
			</div>
		);
	};

	if (loading) return <p className="text-center mt-10">Loading...</p>;
	if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

	return (
		<div className="flex flex-col items-center px-4 py-10">
			<SuccessMessage success={successMessage} />

			<div className="w-full max-w-2xl mx-auto border-4 border-[#55CC03] rounded-3xl p-6 md:p-10 bg-[radial-gradient(ellipse_at_center,_rgba(40,80,50,0.8)_0%,_rgba(0,0,0,0.9)_100%)]">
				<H1Title>Mon compte</H1Title>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					{/* Avatar field */}
					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center w-full">
						<label className="sm:w-40 text-sm">Avatar</label>
						<div className="flex w-full gap-2">
							<Input
								type="text"
								value={form.avatar ? form.avatar.name : "Aucun fichier choisi"}
								readOnly
								width="flex-1"
							/>
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								className="p-2 w-12 h-12 rounded-lg flex items-center justify-center bg-[#55CC03] text-white hover:bg-green-700 transition-colors"
							>
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

					{/* Other editable fields */}
					{renderField("Pseudo", "username")}
					{renderField("Email", "email", "email")}
					<Button label="Modifier mon mot de passe" type="button" />
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

					{/* Delete confirmation panel */}
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
