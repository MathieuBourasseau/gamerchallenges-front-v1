import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";

function MenuBurger() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const closeMenu = () => setIsOpen(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		setIsOpen(false);
	}, [location.pathname]);

	return (
		<>
			{/* Bouton menu burger */}
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

			{/* Overlay du site*/}
			{isOpen && (
				<div onClick={closeMenu} className="fixed inset-0 bg-black/40 z-40" />
			)}

			{/* Menu */}
			<div
				className={`fixed top-0 right-0 h-full w-80 bg-black-dark border-4 border-green-light rounded-l-3xl shadow-[0_0_20px_rgba(132,204,22,0.6)] transform transition-transform duration-300 z-50 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Bouton pour fermer */}
				<div className="flex justify-end p-4">
					<button
						onClick={closeMenu}
						className="bg-green-light p-2 rounded-md hover:bg-green-medium"
					>
						{/* <Icon icon="mdi:close" width="24" className="text-white" /> */}
					</button>
				</div>

				{/* Liens des pages */}
				<nav className="flex flex-col px-10 text-white text-lg space-y-6 mt-10">
					<MenuItem label="ACCUEIL" to="/" closeMenu={closeMenu} />
					<MenuItem
						label="INSCRIPTION / CONNEXION"
						to="/auth"
						closeMenu={closeMenu}
					/>
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
