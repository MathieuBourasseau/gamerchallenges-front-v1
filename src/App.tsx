import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Games from "./Pages/Games/Games";
import GameDetails from "./Pages/Games/GameDetails";
import Challenges from "./Pages/Challenges/Challenges";
import MyChallenges from "./Pages/Challenges/MyChallenges";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Legal from "./Pages/Legal/Legal";
import { Footer } from "./components/Footer/Footer";
import Ranking from "./Pages/Ranking/Ranking";
import BurgerMenu from "./components/MenuBurger/MenuBurger";

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				 <BurgerMenu />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/jeux" element={<Games />} />
					<Route path="/jeux/:id" element={<GameDetails />} />
					<Route path="/challenges" element={<Challenges />} />
					<Route path="/mes-challenges" element={<MyChallenges />} />
					<Route path="/classement" element={<Ranking />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/a-propos" element={<About />} />
					<Route path="/mentions-legales" element={<Legal />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
