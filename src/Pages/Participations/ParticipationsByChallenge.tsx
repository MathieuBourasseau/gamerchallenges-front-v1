import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Challenge } from "../../types/models";
import H1Title from "../../ui/H1Title";
import ReactPlayer from "react-player";
import Pagination from "../../ui/Pagination";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import ErrorSummary from "../../ui/ErrorSummary";

// Nouveaux imports pour la gestion des erreurs
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";

type ApiResponse = Challenge & { error?: string };

export default function ParticipationsByChallenge() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { userInfo, token, loadingUser } = useAuth();

	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [votes, setVotes] = useState<{ [key: number]: boolean }>({});
	const [loadingVote, setLoadingVote] = useState<{ [key: number]: boolean }>(
		{},
	);
	const [voteErrors, setVoteErrors] = useState<{ [key: number]: string }>({});

	const [currentPage, setCurrentPage] = useState(1);
	const participationPerPage = 6;

	const totalPages = Math.ceil(
		(challenge?.participations?.length || 0) / participationPerPage,
	);
	const startIndex = (currentPage - 1) * participationPerPage;
	const currentParticipations =
		challenge?.participations?.slice(
			startIndex,
			startIndex + participationPerPage,
		) || [];

	useEffect(() => {
		const fetchParticipations = async () => {
			const API_URL = import.meta.env.VITE_API_URL;
			setChallenge(null);
			setError(null);

			try {
				const res = await fetch(`${API_URL}/challenges/${id}/participations`);
				const data: ApiResponse = await res.json();
				if (!res.ok)
					throw new Error(
						data.error || "Impossible d'afficher les participations.",
					);

				setChallenge(data);
			} catch (err: any) {
				if (err instanceof Error) setError(err.message);
				else
					setError("Le serveur ne répond pas. Veuillez réessayer plus tard.");
			}
		};

		if (id) fetchParticipations();
	}, [id]);

	useEffect(() => {
		const checkVotes = async () => {
			if (!token || !challenge?.participations) return;
			const API_URL = import.meta.env.VITE_API_URL;

			try {
				const results: { [key: number]: boolean } = {};
				const voteCounts: { [key: number]: number } = {};

				for (const p of challenge.participations) {
					const res = await fetch(`${API_URL}/participations/${p.id}/vote`, {
						headers: { Authorization: `Bearer ${token}` },
					});
					const data = await res.json();

					results[p.id] = data.hasVoted;
					voteCounts[p.id] = data.voteCounted;
				}

				setVotes(results);

				setChallenge((prev) => {
					if (!prev) return prev;
					return {
						...prev,
						participations: prev.participations?.map((p) => ({
							...p,
							voteCounted: voteCounts[p.id] ?? p.voteCounted,
						})),
					};
				});
			} catch (err) {
				console.error(err);
			}
		};

		checkVotes();
	}, [token, challenge?.id]);

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
			const res = await fetch(
				`${API_URL}/participations/${participationId}/vote`,
				{
					method: hasVoted ? "DELETE" : "POST",
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			const data = await res.json();

			if (!res.ok) {
				setVoteErrors((prev) => ({
					...prev,
					[participationId]: data.error || "Erreur",
				}));
				throw new Error(data.error || "Erreur");
			}

			setVoteErrors((prev) => {
				const next = { ...prev };
				delete next[participationId];
				return next;
			});

			setVotes((prev) => ({ ...prev, [participationId]: !hasVoted }));

			setChallenge((prev) => {
				if (!prev) return prev;
				return {
					...prev,
					participations: prev.participations?.map((p) =>
						p.id === participationId
							? { ...p, voteCounted: data.voteCounted }
							: p,
					),
				};
			});
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingVote((prev) => ({ ...prev, [participationId]: false }));
		}
	};

	const hasParticipation = (challenge?.participations?.length ?? 0) > 0;

	if (!challenge && !error)
		return (
			<p className="text-white animate-pulse text-center mt-10">
				Chargement en cours...
			</p>
		);

	return (
		<section className="p-2">
			{error && <ErrorSummary errors={{ server: error }} />}
			<H1Title size="h1-mobile">
				Participations au challenge : {challenge?.name}
			</H1Title>

			<div className="grid grid-cols-1 gap-6 w-[90%] max-w-[370px] mx-auto md:grid-cols-2 md:max-w-[600px] md:gap-12 lg:grid-cols-3 lg:max-w-[1200px]">
				{hasParticipation ? (
					currentParticipations.map((p) => (
						<div key={p.id} className="flex flex-col gap-2">
							<div className="border border-green-light rounded-lg overflow-hidden relative aspect-video w-full">
								<ReactPlayer
									src={p.url}
									controls
									width="100%"
									height="100%"
									className="absolute top-0 left-0"
								/>
							</div>
							<div className="flex flex-col items-center text-p-mobile md:text-p-tablet text-white mt-1">
								<div className="flex items-center gap-2">
									<span>{p.voteCounted || 0}</span>
									{loadingUser ? (
										<FaHeart className="text-gray-400 animate-pulse" />
									) : userInfo ? (
										<FaHeart
											className={`cursor-pointer text-[18px] ${votes[p.id] ? "text-red-500" : "text-white"}`}
											onClick={() => !loadingVote[p.id] && handleVote(p.id)}
										/>
									) : (
										<FaHeart
											className="text-gray-400"
											title="Connectez-vous pour voter"
										/>
									)}
								</div>
								{voteErrors[p.id] && (
									<ErrorSummary errors={{ vote: voteErrors[p.id] }} />
								)}
							</div>
						</div>
					))
				) : (
					<div className="col-span-full flex justify-center text-white mt-4 opacity-50">
						<p>Il n'y a aucune participation actuellement à ce challenge.</p>
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
