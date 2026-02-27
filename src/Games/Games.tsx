import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Game = {
	id: number;
	title: string;
	cover: string;
};

const Games = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const API_URL = import.meta.env.VITE_API_URL;

	const fetchGames = async (pageNumber: number = 1) => {
		try {
			const res = await fetch(`${API_URL}/games?page=${pageNumber}&limit=6`);
			if (!res.ok) throw new Error("Erreur lors de la récupération des jeux");

			const data = await res.json();
			console.log("Données reçues :", data);

			setGames(data.games);
			setPage(data.page);
			setTotalPages(data.totalPages);
		} catch (err) {
			console.error(err);
			setError("Impossible de charger les jeux.");
		}
	};

	useEffect(() => {
		fetchGames();
	}, []);

	if (error) return <p>{error}</p>;

	return (
		<div>
			<h1>Liste des jeux</h1>

			{games.map((game) => (
				<Link key={game.id} to={`/games/${game.id}`}>
					<img src={game.cover} alt={game.title} width={150} />
					<h3>{game.title}</h3>
				</Link>
			))}

			<div>
				{page > 1 && (
					<button type="button" onClick={() => fetchGames(page - 1)}>
						Précédent
					</button>
				)}

				<span>
					Page {page} / {totalPages}
				</span>

				{page < totalPages && (
					<button type="button" onClick={() => fetchGames(page + 1)}>
						Suivant
					</button>
				)}
			</div>
		</div>
	);
};

export default Games;
