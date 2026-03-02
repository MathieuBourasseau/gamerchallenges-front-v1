import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Games from "./Games/Games";
import GameDetails from "./Games/GameDetails";
import Challenges from "./Challenges/Challenges";
import MyChallenges from "./Challenges/MyChallenges";
import Contact from "./Contact/Contact";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/games" element={<Games />} />
				<Route path="/games/:id" element={<GameDetails />} />
				<Route path="/challenges" element={<Challenges />} />
				<Route path="/my-challenges" element={<MyChallenges />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</BrowserRouter>
	);
}
