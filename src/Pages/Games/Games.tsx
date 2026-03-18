import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import Pagination from "../../ui/Pagination";
import H1Title from "../../ui/H1Title";
import H2 from "../../ui/H2";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";


type Game = {
	id: number;
	title: string;
	cover: string;
};

const Games = () => {
	const [games, setGames] = useState<Game[]>([]);
	const [error, setError] = useState<Partial<ApiErrorResponse>>({});
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const API_URL = import.meta.env.VITE_API_URL;

	const fetchGames = async (pageNumber: number = 1) => {

		setError({});

		try {

			const res = await fetch(`${API_URL}/games?page=${pageNumber}&limit=6`);
			const data = await res.json();

			// Throw object from back end 
			if (!res.ok) throw data;

			console.log("Données reçues :", data);

			setGames(data.games);
			setPage(data.page);
			setTotalPages(data.totalPages);

		} catch (err: any) {

			console.error(err);
			setError({
				statusCode: err.status || 500,
				server: err.error || "Impossible de charger les jeux."
			});
		}
	};

	useEffect(() => {
		fetchGames(page);
	}, [page]);

	return (
		<div className="px-4 sm:px-6 lg:px-8">

			{/* HANDLE ERRORS */}
			<ErrorSummary errors={error} />

			<H1Title>JEUX</H1Title>

			{error.server && games.length === 0 ? (
				<p className="text-center text-white mt-10 opacity-50">Aucun jeu à afficher pour le moment.</p>
			) : (
				<>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
						{games.map((game) => (
							<Link
								key={game.id}
								to={`/jeux/${game.id}`}
								className="flex flex-col items-center"
							>
								<Image src={game.cover} alt={game.title} />
								<H2>{game.title}</H2>
							</Link>
						))}
					</div>

					{/* On affiche la pagination que si on a au moins 1 page */}
					{totalPages > 0 && (
						<Pagination
							currentPage={page}
							totalPages={totalPages}
							onPageChange={setPage}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Games;
