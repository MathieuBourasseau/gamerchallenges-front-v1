import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Challenge } from "../../types/models";
import H1Title from "../../ui/H1Title";
import ReactPlayer from "react-player";
import Pagination from "../../ui/Pagination";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

type ApiResponse = Challenge & { error?: string };

export default function ParticipationsByChallenge() {
	// --- Get id from params ---
	const { id } = useParams();
	const { userInfo, token, loadingUser } = useAuth();

	// --- STATES INITIALIZATION ---
	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [error, setError] = useState<string | null>(null);

	// VOTES STATES
	const [votes, setVotes] = useState<{ [key: number]: boolean }>({});
	const [loadingVote, setLoadingVote] = useState<{ [key: number]: boolean }>(
		{},
	);

	// NAVIGATION
	const navigate = useNavigate();

	// --- PAGINATION DATA ---
	const [currentPage, setCurrentPage] = useState<number>(1);
	const participationPerPage: number = 6;
	const totalPages = Math.ceil(
		(challenge?.participations?.length || 0) / participationPerPage,
	);
	const endIndex = participationPerPage * currentPage;
	const startIndex = endIndex - participationPerPage;
	const currentParticipations =
		challenge?.participations?.slice(startIndex, endIndex) || [];

	// --- SHOW PARTICIPATIONS IF EXISTING ---
	useEffect(() => {
		const fetchParticipations = async () => {
			const API_URL = import.meta.env.VITE_API_URL;
			setChallenge(null);
			setError(null);

			try {
				const response = await fetch(
					`${API_URL}/challenges/${id}/participations`,
				);
				const data: ApiResponse = await response.json();
				console.log("Données reçues:", data);

				// Check the server answer
				if (!response.ok) {
					throw new Error(
						data.error || "Impossible d'afficher les participations.",
					);
				}

				setChallenge(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("Le serveur ne répond pas. Veuillez réessayer plus tard.");
				}
			}
		};

		if (id) fetchParticipations();
	}, [id]);

	// Check votes for each participation
	useEffect(() => {
		const checkVotes = async () => {
			if (!token || !challenge?.participations) return;

			const API_URL = import.meta.env.VITE_API_URL;

			try {
				const results: { [key: number]: boolean } = {};

				for (const participation of challenge.participations) {
					const response = await fetch(
						`${API_URL}/participations/${participation.id}/vote`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					);

					const data = await response.json();
					results[participation.id] = data.hasVoted;
				}

				setVotes(results);
			} catch (error) {
				console.error(error);
			}
		};

		checkVotes();
	}, [token, challenge]);

	// Handle vote
	const handleVote = async (participationId: number) => {
		if (!userInfo) {
			navigate("/auth");
			return;
		}

		if (loadingVote[participationId]) return;
		setLoadingVote((prev) => ({ ...prev, [participationId]: true }));

		const API_URL = import.meta.env.VITE_API_URL;
		const hasVoted = votes[participationId] ?? false;

		try {
			const response = await fetch(
				`${API_URL}/participations/${participationId}/vote`,
				{
					method: hasVoted ? "DELETE" : "POST",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await response.json();
			if (!response.ok) throw new Error(data.message);

			// Toggle vote status
			setVotes((prev) => ({
				...prev,
				[participationId]: !hasVoted,
			}));

			// Update vote count locally
			setChallenge((prev) => {
				if (!prev) return prev;

				return {
					...prev,
					participations: prev.participations?.map((participation) => {
						if (participation.id !== participationId) return participation;

						return {
							...participation,
							voteCounted: hasVoted
								? Number(participation.voteCounted) - 1
								: Number(participation.voteCounted) + 1,
						};
					}),
				};
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingVote((prev) => ({ ...prev, [participationId]: false }));
		}
	};

	const hasParticipation = (challenge?.participations?.length ?? 0) > 0;

	return (
		<section className="p-2">
			<H1Title size={"h1-mobile"}>
				Participations au challenge : {challenge?.name}
			</H1Title>

			<div
				className="grid grid-cols-1 gap-6 w-[90%] max-w-[370px] mx-auto
                      md:grid-cols-2 md:max-w-[600px] md:gap-12
                      lg:grid-cols-3 lg:max-w-[1200px]"
			>
				{hasParticipation ? (
					currentParticipations.map((participation) => (
						<div key={participation.id} className="flex flex-col gap-2">
							<div className="border border-green-light rounded-lg overflow-hidden relative aspect-video w-full">
								<ReactPlayer
									src={participation.url}
									controls={true}
									width="100%"
									height="100%"
									className="absolute top-0 left-0"
								/>
							</div>
							<div className="flex flex-col items-center text-p-mobile md:text-p-tablet">
								<p>{participation.title}</p>
								<p>Posté par : {participation.player?.username}</p>

								{/* --- Bouton vote avec nombre de votes --- */}
								<div className="flex items-center gap-2 mt-1">
									<span>{Number(participation.voteCounted) || 0}</span>
									{loadingUser ? (
										<FaHeart className="text-gray-400 animate-pulse" />
									) : userInfo ? (
										<FaHeart
											className="cursor-pointer text-white text-[18px]"
											onClick={() => handleVote(participation.id)}
										/>
									) : (
										<FaHeart
											className="text-gray-400"
											title="Connectez-vous pour voter"
										/>
									)}
								</div>
							</div>
						</div>
					))
				) : (
					<div>
						<p>Il n'y aucune participation actuellement à ce challenge.</p>
					</div>
				)}
			</div>

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			)}
		</section>
	);
}
