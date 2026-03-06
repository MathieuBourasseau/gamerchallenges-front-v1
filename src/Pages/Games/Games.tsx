import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import Pagination from "../../ui/Pagination";
import H1Title from "../../ui/H1Title";

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
		} catch (error) {
			console.error(error);
			setError("Impossible de charger les jeux.");
		}
	};

	useEffect(() => {
		fetchGames(page);
	}, [page]);

	if (error) return <p>{error}</p>;

	return (
		<div className="px-4 sm:px-6 lg:px-8">
			{" "}
			<H1Title>JEUX</H1Title>
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
				{" "}
				{games.map((game) => (
					<Link
						key={game.id}
						to={`/games/${game.id}`}
						className="flex flex-col items-center"
					>
						<Image src={game.cover} alt={game.title} />
						<h3 className="mt-2 text-lg font-semibold text-white">
							{game.title}
						</h3>
					</Link>
				))}
			</div>
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={setPage}
			/>
		</div>
	);
};

export default Games;
