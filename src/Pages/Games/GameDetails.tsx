import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../../ui/Image";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

type Game = {
	id: number;
	title: string;
	genre: string;
	release_year: string;
	cover: string;
	description: string;
	challenges: Challenge[];
};

type Challenge = {
	id: number;
	name: string;
	description: string;
	votes: number;
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
			<div className="border-2 border-[var(--color-green-light)] rounded-2xl p-8">
				<div className="flex flex-col md:flex-row gap-6">
					<Image src={game.cover} alt={game.title} />

					<div className="flex flex-col gap-3">
						<h2 className="text-2xl font-semibold text-white">{game.title}</h2>

						<p className="text-white">{game.description}</p>

						<div className="flex gap-3 text-white font-bold">
							<span>{new Date(game.release_year).getFullYear()} </span>
							<span>{game.genre}</span>
						</div>
					</div>
				</div>

				<div className="my-8 h-[3px] bg-white" />

				<div className="flex flex-col gap-6">
					<h3 className="text-center text-xl font-semibold text-white tracking-wider">
						CHALLENGES
					</h3>

					{game.challenges.map((challenge) => (
						<Link
							to={`/challenges/${challenge.id}`}
							key={challenge.id}
							className="flex items-center justify-between
                       border-2 border-[var(--color-green-light)]
											 bg-[var(--color-blue-dark)]
                       rounded-md px-6 py-3"
						>
							<span className="text-white">{challenge.name}</span>

							<div className="flex items-center gap-2 text-white font-bold">
								<span>{challenge.totalVotes ?? 0}</span>
								<FaHeart className="text-white" />
							</div>
						</Link>
					))}
				</div>
			</div>
			<div className="flex justify-center mt-10 w-full">
				<Link to="/jeux">
					<Button label="Retour" type="button" />
				</Link>
			</div>
		</div>
	);
};

export default GameDetails;
