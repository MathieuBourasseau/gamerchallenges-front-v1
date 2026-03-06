import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Games from "./Games/Games";
import GameDetails from "./Games/GameDetails";
import Challenges from "./Pages/Challenges/Challenges";
import MyChallenges from "./Pages/Challenges/MyChallenges";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Legal from "./Pages/Legal/Legal";

import { Footer } from "./Components/Footer";
import Ranking from "./Pages/Ranking/Ranking";

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/games" element={<Games />} />
					<Route path="/games/:id" element={<GameDetails />} />
					<Route path="/challenges" element={<Challenges />} />
					<Route path="/my-challenges" element={<MyChallenges />} />
					<Route path="/ranking" element={<Ranking />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/a-propos" element={<About />} />
					<Route path="/mentions-legales" element={<Legal />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
