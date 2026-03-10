import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import manette from "../../assets/images/manetteGC.png";
import { useState } from "react";

function Header() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const handleSearch = () => {
		console.log("Recherche :", search);

		if (search.trim() !== "") {
			navigate(`/search?q=${search}`);
		}
	};

	return (
		<header className="hidden min-[1080px]:flex w-full mt-4 px-4">
			<div className="w-full bg-linear-to-t from-green-dark to-green-medium px-4 py-2 flex items-center justify-between rounded-full">
				{/* Logo + login */}
				<div className="flex items-center gap-2 lg:gap-4">
					<img
						src={manette}
						alt="manette"
						className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
					/>

					<Link
						to="/login"
						className="hidden lg:block text-white font-semibold hover:text-green-light transition"
					>
						INSCRIPTION / CONNEXION
					</Link>
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

					<select className="hidden lg:block px-3 py-2 rounded-full bg-gray-900 text-white">
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
