import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Games from "./Games/Games";
import GameDetails from "./Games/GameDetails";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/games" element={<Games />} />
				<Route path="/games/:id" element={<GameDetails />} />
			</Routes>
		</BrowserRouter>
	);
}
