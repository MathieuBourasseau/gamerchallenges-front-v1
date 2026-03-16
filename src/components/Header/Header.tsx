import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import manette from "../../assets/images/manetteGC.png";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../ui/Button";

function Header() {
	const { userInfo, logout } = useAuth();
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("Jeux"); // new state for categories
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const handleSearch = () => {
		console.log("Recherche :", search);

		if (search.trim() !== "") {
			navigate(`/recherche?category=${category}&q=${search}`);
			setSearch(""); // clear the search input
		}
	};

	return (
		<header className="hidden min-[1080px]:flex w-full mt-4 px-4">
			<div className="w-full bg-linear-to-t from-green-dark to-green-medium px-4 py-2 flex items-center justify-between rounded-full">
				{/* Logo + login */}
				<div className="flex items-center gap-2 lg:gap-4">
					<Link to="/">
						<img
							src={manette}
							alt="manette"
							className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
						/>
					</Link>
					{userInfo ? (
						<div className="hidden lg:flex items-center gap-3">
							{/* Avatar */}
							<Link to="/mon-profil">
								<img
									src={userInfo.avatar || manette}
									alt="avatar"
									className="w-10 h-10 rounded-full border-2 border-green-light object-cover hover:scale-105 transition"
								/>
							</Link>

							{/* Username */}
							<Link
								to="/mon-profil"
								className="text-white font-semibold hover:text-green-light transition"
							>
								{userInfo.username}
							</Link>

							{/* Logout */}
							<Button
								label="Déconnexion"
								type="button"
								onClick={handleLogout}
							/>
						</div>
					) : (
						<Link
							to="/auth"
							className="hidden lg:block text-white font-semibold hover:text-green-light transition"
						>
							INSCRIPTION / CONNEXION
						</Link>
					)}
				</div>

				{/* Links */}
				<nav className="hidden lg:flex gap-6 xl:gap-8 text-white font-semibold text-center">
					<Link to="/jeux" className="hover:text-green-light">
						JEUX
					</Link>

					<Link to="/challenges" className="hover:text-green-light">
						CHALLENGES
					</Link>

					<Link to="/classement" className="hover:text-green-light">
						CLASSEMENT
					</Link>
				</nav>

				{/* Searchbar */}
				<div className="flex items-center gap-2 lg:gap-3">
					<input
						type="text"
						placeholder="Rechercher..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
						className="hidden lg:block px-4 py-2 w-40 xl:w-60 rounded-full bg-gray-900 text-white placeholder-gray-400 outline-none"
					/>

					<select
						value={category} // categories added for search
						onChange={(e) => setCategory(e.target.value)}
						className="hidden lg:block px-3 py-2 rounded-full bg-gray-900 text-white"
					>
						{" "}
						<option>Jeux</option>
						<option>Challenges</option>
						<option>Joueurs</option>
					</select>

					<button
						onClick={handleSearch}
						className="bg-green-light w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full"
					>
						<Icon
							icon="mdi:magnify"
							className=" hover:text-green-dark transition-colors"
							width="24"
						/>
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
