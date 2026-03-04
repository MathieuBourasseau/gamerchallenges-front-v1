import { useEffect, useState } from "react";
import H1Title from "../ui/H1Title";
import { FaHeart } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import Image from "../ui/Image";

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
			} catch (error) {
				setError("Impossible de charger les classements");
			} finally {
				setLoading(false);
			}
		};

		fetchRankings();
	}, []);

	if (loading) return <p>Chargement...</p>;
	if (error) return <p>{error}</p>;

	//même type de carte pour chaque joueur - peut-être à isoler en composant ?
	const userCard = (user: RankingUser, index: number, isVote?: boolean) => {
		const widthClass = index === 0 ? "w-80" : "w-64"; // 1er joueur a une carte plus large que les autres
		return (
			<li
				key={user.id}
				className={`${widthClass} border-3 border-green-medium rounded-3xl overflow-hidden p-4 mb-4 flex flex-col items-center gap-2 text-center shadow-md hover:shadow-lg transition-shadow`}
			>
				<Image
					src={user.avatar}
					alt={user.username}
					className="w-16 h-16 rounded-full"
				/>
				<span className="font-semibold">{user.username}</span>
				{isVote ? (
					<span className="flex items-center gap-2">
						<span className="font-semibold">{user.username}</span>
						<span className="flex items-center gap-1">
							{user.voteCount} <FaHeart className="text-red-500" />
						</span>
					</span>
				) : (
					<span>{user.participationCount} participation(s)</span>
				)}
			</li>
		);
	};

	return (
		<div className="max-w-md mx-auto">
			<H1Title>CLASSEMENTS</H1Title>

			<h2 className="flex items-center justify-center gap-2 mb-2">
				<FaTrophy className="text-yellow-500" /> Top participations
			</h2>
			<ul className="flex flex-col items-center">
				{topParticipations.map((user, index) => userCard(user, index))}
			</ul>

			<h2 className="flex items-center justify-center gap-2 mt-6 mb-2">
				<FaTrophy className="text-yellow-500" /> Top votes reçus
			</h2>
			<ul className="flex flex-col items-center">
				{topVotes.map((user, index) => userCard(user, index, true))}
			</ul>
		</div>
	);
}
