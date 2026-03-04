import { useEffect, useState } from "react";
import H1Title from "../ui/H1Title";
import { FaHeart, FaTrophy } from "react-icons/fa";
import Image from "../ui/Image";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

type RankingUser = {
	id: number;
	username: string;
	avatar: string;
	participationCount?: number;
	voteCount?: number;
};

export default function Ranking() {
	const [topParticipations, setTopParticipations] = useState<RankingUser[]>([]);
	const [topVotes, setTopVotes] = useState<RankingUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const API_URL = import.meta.env.VITE_API_URL;

	useEffect(() => {
		const fetchRankings = async () => {
			try {
				const [participations, votes] = await Promise.all([
					fetch(`${API_URL}/ranking/participations`),
					fetch(`${API_URL}/ranking/votes`),
				]);

				if (!participations.ok || !votes.ok) {
					throw new Error("Erreur lors du chargement");
				}

				const participationsData = await participations.json();
				const votesData = await votes.json();

				setTopParticipations(participationsData);
				setTopVotes(votesData);
			} catch {
				setError("Impossible de charger les classements");
			} finally {
				setLoading(false);
			}
		};

		fetchRankings();
	}, []);

	if (loading) return <p>Chargement...</p>;
	if (error) return <p>{error}</p>;

	// même type de carte pour chaque joueur - peut-être à isoler en composant ?
	const userCard = (user: RankingUser, index: number, isVote?: boolean) => {
		// Largeur plus grande pour joueur numéro 1
		const isFirst = index === 0;

		return (
			<li
				key={user.id}
				className={`
  				w-full border-3 border-green-medium rounded-3xl
  				flex flex-col items-center gap-2 text-center
  				shadow-md hover:shadow-lg transition-shadow
  				${isFirst ? "max-w-[28rem] p-6 scale-105 md:scale-110" : "max-w-[20rem] p-4"}
`}
			>
				<div className="relative">
					<div className="absolute inset-0 top-0 bottom-0 left-1/2 transform -translate-x-1/2 bg-green-light opacity-20 rounded-full blur-3xl"></div>
					<Image
						src={user.avatar}
						alt={user.username}
						className={`rounded-full relative z-10 ${isFirst ? "w-28 h-28" : "w-20 h-20"}`}
					/>
				</div>

				<span className="font-semibold">{user.username}</span>
				{isVote ? (
					<span className="flex items-center gap-1">
						{user.voteCount} <FaHeart className="text-red-500" />
					</span>
				) : (
					<span>{user.participationCount} participation(s)</span>
				)}
			</li>
		);
	};

	return (
		<div className="max-w-5xl mx-auto px-4">
			<H1Title>CLASSEMENTS</H1Title>

			<h2 className="flex items-center justify-center gap-2 mb-2">
				<FaTrophy className="text-yellow-500" /> Top participations
			</h2>
			<ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
				{topParticipations.map((user, index) => userCard(user, index))}
			</ul>

			<h2 className="flex items-center justify-center gap-2 mt-6 mb-2">
				<FaTrophy className="text-yellow-500" /> Top votes reçus
			</h2>
			<ul className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
				{topVotes.map((user, index) => userCard(user, index, true))}
			</ul>
			<div className="flex justify-center mt-10 w-full">
				<Link to="/">
					<Button label="Retour à l'accueil" type="button" />
				</Link>
			</div>
		</div>
	);
}
