import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home/Home";
import Games from "./Pages/Games/Games";
import GameDetails from "./Pages/Games/GameDetails";
import Challenges from "./Pages/Challenges/Challenges";
import ChallengeDetails from "./Pages/Challenges/ChallengeDetails";
import MyChallenges from "./Pages/Challenges/MyChallenges";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Legal from "./Pages/Legal/Legal";
import { Footer } from "./components/Footer/Footer";
import Ranking from "./Pages/Ranking/Ranking";
import MyAccount from "./Pages/My-Account/My-account";
import Header from "./components/Header/Header";
import MenuBurger from "./components/MenuBurger/MenuBurger";
import SearchPage from "./Pages/SearchPage/SearchPage";
import ParticipationsByChallenge from "./Pages/Participations/ParticipationsByChallenge";
import Auth from "./Pages/Authentication/Auth";
import { AuthProvider } from "./Context/AuthContext";

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<div className="min-h-screen flex flex-col">
					<Header />
					<MenuBurger />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/jeux" element={<Games />} />
						<Route path="/jeux/:id" element={<GameDetails />} />
						<Route path="/challenges" element={<Challenges />} />
						<Route path="/challenges/:id" element={<ChallengeDetails />} />
						<Route
							path="/challenges/:id/participations"
							element={<ParticipationsByChallenge />}
						/>
						<Route path="/mon-compte" element={<MyAccount />} />
						<Route path="/mes-challenges" element={<MyChallenges />} />
						<Route path="/classement" element={<Ranking />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/a-propos" element={<About />} />
						<Route path="/mentions-legales" element={<Legal />} />
						<Route path="/recherche" element={<SearchPage />} />
						<Route path="/auth" element={<Auth />} />
					</Routes>
					<Footer />
				</div>
			</BrowserRouter>
		</AuthProvider>
	);
}
