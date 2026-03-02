import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameImage from "../ui/GameCover";

type Game = {
	id: number;
	title: string;
	genre: string;
	release_year: string;
	cover: string;
	description: string;
};

const GameDetails = () => {
	const { id } = useParams();
	const [game, setGame] = useState<Game | null>(null);
	const [error, setError] = useState<string | null>(null);

	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchGame = async () => {
			try {
				const res = await fetch(`${API_URL}/games/${id}`);
				if (!res.ok) throw new Error("Erreur lors de la récupération du jeu");

				const data = await res.json();
				setGame(data);
			} catch (err) {
				console.error(err);
				setError("Impossible de charger le jeu.");
			}
		};

		if (id) fetchGame();
	}, [id, API_URL]);

	if (error) return <p>{error}</p>;
	if (!game) return <p>Chargement...</p>;

	return (
		<div className="mx-3 md:mx-0 mt-5">
			<div className="bg-[var(--color-blue-dark)] border border-[var(--color-green-light)] rounded-lg p-5 flex flex-col md:flex-row md:items-center gap-5">
				<div className="flex-shrink-0 flex justify-center">
					<GameImage src={game.cover} alt={game.title} />
				</div>
				<div className="flex flex-col gap-3 items-center md:items-start text-center md:text-left">
					<h2 className="text-2xl md:text-3xl font-semibold text-white">
						{game.title}
					</h2>
					<p className="text-white text-justify">{game.description}</p>
					<div className="flex gap-3">
						<p className="text-white font-bold">
							{new Date(game.release_year).getFullYear()} -
						</p>
						<p className="text-white font-bold">{game.genre}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameDetails;
