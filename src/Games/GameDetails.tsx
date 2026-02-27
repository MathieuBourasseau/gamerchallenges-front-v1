import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

		if (id) {
			fetchGame();
		}
	}, [id, API_URL]);

	if (error) return <p>{error}</p>;
	if (!game) {
		return <p>Chargement...</p>;
	}

	return (
		<div>
			<h1>{game.title}</h1>
			<img src={game.cover} alt={game.title} width={200} />
			<p>
				<strong>Genre :</strong> {game.genre}
			</p>
			<p>
				<strong>Année :</strong> {new Date(game.release_year).getFullYear()}
			</p>
			<p>{game.description}</p>
		</div>
	);
};

export default GameDetails;
