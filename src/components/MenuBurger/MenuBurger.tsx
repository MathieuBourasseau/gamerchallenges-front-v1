import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import { useAuth } from "../../hooks/useAuth";
import Button from "../../ui/Button";

function MenuBurger() {
	const { userInfo, logout } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const closeMenu = () => setIsOpen(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	const handleLogout = () => {
		logout();
		navigate("/");
		closeMenu(); // close menu after log out
	};

	useEffect(() => {
		setIsOpen(false); // close menu every page change
	}, [location.pathname]);

	return (
		<>
			{/* Button menu burger */}
			<button
				onClick={toggleMenu}
				className="
          lg:hidden
          fixed right-6 top-15 md:top-32
          z-50
          bg-green-light hover:bg-green-medium
          p-2 md:p-3
          rounded-lg
          transition
        "
			>
				<Icon icon="mdi:menu" className="text-white w-5 h-5 md:w-7 md:h-7" />
			</button>

			{/* Overlay */}
			{isOpen && (
				<div onClick={closeMenu} className="fixed inset-0 bg-black/40 z-40" />
			)}

			{/* Menu */}
			<div
				className={`fixed top-0 right-0 h-full w-80 bg-black-dark border-4 border-green-light rounded-l-3xl shadow-[0_0_20px_rgba(132,204,22,0.6)] transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
					}`}
			>
				{/* Close menu button */}
				<div className="flex justify-end p-4">
					<button
						onClick={closeMenu}
						className="bg-green-light p-2 rounded-md hover:bg-green-medium"
					>
						<Icon icon="mdi:close" width="24" className="text-white" />
					</button>
				</div>

				{/* If user is logged */}
				{userInfo ? (
					<div className="flex flex-col items-center gap-4 mt-4 px-6">
						<Link to="/mon-profil" onClick={closeMenu}>
							<img
								src={userInfo.avatar || "/default-avatar.png"}
								alt="avatar"
								className="w-16 h-16 rounded-full border-2 border-green-light object-cover"
							/>
						</Link>
						<Link
							to="/mon-profil"
							onClick={closeMenu}
							className="text-white font-semibold hover:text-green-light transition"
						>
							{userInfo.username}
						</Link>
						<Button label="Déconnexion" type="button" onClick={handleLogout} />
					</div>
				) : (
					<MenuItem
						label="INSCRIPTION / CONNEXION"
						to="/auth"
						closeMenu={closeMenu}
					/>
				)}

				{/* Main links */}
				<nav className="flex flex-col px-10 text-white text-lg space-y-6 mt-10">
					<MenuItem label="ACCUEIL" to="/" closeMenu={closeMenu} />
					<MenuItem label="JEUX" to="/jeux" closeMenu={closeMenu} />
					<MenuItem label="CHALLENGES" to="/challenges" closeMenu={closeMenu} />
					<MenuItem label="CLASSEMENT" to="/classement" closeMenu={closeMenu} />
					<MenuItem label="A PROPOS" to="/a-propos" closeMenu={closeMenu} />
					<MenuItem
						label="NOUS CONTACTER"
						to="/contact"
						closeMenu={closeMenu}
					/>
				</nav>
			</div>
		</>
	);
}

export default MenuBurger;