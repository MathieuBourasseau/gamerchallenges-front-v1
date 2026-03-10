import { useState, useEffect, ChangeEvent } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";

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
	const [user, setUser] = useState<User | null>(null);
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
	const [toast, setToast] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/users/${userId}`,
				);
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
				setAvatarPreview(
					data.avatar
						? `${import.meta.env.VITE_API_URL}/uploads/avatars/${data.avatar}`
						: null,
				);
			} catch (error) {
				console.error("Erreur récupération user :", error);
			}
		};

		fetchUser();
	}, [userId]);

	// Handle input change
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle file change with preview
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setForm((prev) => ({ ...prev, avatar: file }));
			setAvatarPreview(URL.createObjectURL(file));
		}
	};

	// Submit
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
				{ method: "PATCH", body: formData },
			);
			const updatedUser = await response.json();
			setUser(updatedUser.user);

			// Toast
			setToast(true);
			setTimeout(() => setToast(false), 3000);

			// Stop editing field
			setEditingField(null);
		} catch (error) {
			console.error("Erreur mise à jour :", error);
			alert("Erreur lors de la mise à jour du compte");
		}
	};

	if (!user) return <p className="text-center mt-10">Chargement...</p>;

	return (
		<div className="flex justify-center items-center min-h-screen px-4">
			<div className="w-full max-w-2xl bg-green-800/60 border-4 border-green-400 rounded-3xl p-6 md:p-10">
				<h1 className="text-center text-3xl font-bold text-white mb-10">
					MON COMPTE
				</h1>

				{/* Avatar */}
				<div className="flex flex-col items-center mb-6">
					{avatarPreview && (
						<img
							src={avatarPreview}
							alt="Avatar"
							className="w-24 h-24 rounded-full object-cover border-2 border-green-400 mb-4"
						/>
					)}
					<div className="flex flex-col sm:flex-row gap-3 items-center w-full">
						<label className="sm:w-40 text-white text-sm">Avatar</label>
						<input
							type="file"
							onChange={handleFileChange}
							className="flex-1 bg-black/40 text-white rounded-full px-6 py-2"
						/>
					</div>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					{/* Fields */}
					{[
						{ name: "username", label: "Pseudo", type: "text" },
						{ name: "email", label: "Email", type: "email" },
						{ name: "favouriteGame", label: "Jeu favori", type: "text" },
						{ name: "twitch", label: "Twitch", type: "text" },
						{ name: "youtube", label: "Youtube", type: "text" },
						{ name: "discord", label: "Discord", type: "text" },
					].map((field) => (
						<div
							key={field.name}
							className="flex flex-col sm:flex-row gap-3 items-center"
						>
							<label className="sm:w-40 text-white text-sm">
								{field.label}
							</label>
							<input
								type={field.type}
								name={field.name}
								value={form[field.name as keyof UserForm] as string}
								onChange={handleChange}
								disabled={editingField !== field.name}
								className="flex-1 bg-black/40 text-white rounded-full px-6 py-2 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-400"
							/>
							<button
								type="button"
								onClick={() =>
									setEditingField(
										editingField === field.name ? null : field.name,
									)
								}
								className="bg-green-400 rounded-md px-3 py-2 hover:bg-green-500 text-black"
							>
								{editingField === field.name ? <FaCheck /> : <FaEdit />}
							</button>
						</div>
					))}

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
						<button
							type="submit"
							className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition"
						>
							Enregistrer mes infos
						</button>

						<button
							type="button"
							className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition"
						>
							Supprimer mon compte
						</button>
					</div>
				</form>
			</div>

			{/* Toast */}
			{toast && (
				<div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in">
					Profil mis à jour ✅
				</div>
			)}
		</div>
	);
}
