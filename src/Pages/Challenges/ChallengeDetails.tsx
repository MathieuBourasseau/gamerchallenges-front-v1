import { useEffect, useState } from "react";
import type { Challenge } from "../../types/models";
import { Link, useParams, useNavigate } from "react-router-dom";
import Image from "../../ui/Image";
import H1Title from "../../ui/H1Title";
import { FaHeart } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useAuth } from "../../hooks/useAuth";
import ErrorSummary from "../../ui/ErrorSummary";

type ApiResponse = Challenge & { error?: string };

export default function ChallengeDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { userInfo, token, loadingUser } = useAuth();

	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [voteErrors, setVoteErrors] = useState<{ [key: number]: string }>({});
	const [votes, setVotes] = useState<{ [key: number]: boolean }>({});
	const [loadingVote, setLoadingVote] = useState<{ [key: number]: boolean }>(
		{},
	);

	useEffect(() => {
		const fetchChallenge = async () => {
			const API_URL = import.meta.env.VITE_API_URL;
			setChallenge(null);

			try {
				const res = await fetch(`${API_URL}/challenges/${id}`);
				const data: ApiResponse = await res.json();

				if (!res.ok)
					throw new Error(data.error || "Impossible d'afficher ce challenge.");

				data.created_at = new Intl.DateTimeFormat("fr-FR")
					.format(new Date(data.created_at))
					.replaceAll("/", ".");

				setChallenge(data);
			} catch (err: any) {
				console.error(err);
			}
		};

		if (id) fetchChallenge();
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

	if (!challenge)
		return (
			<p className="text-white animate-pulse text-center mt-10">
				Chargement...
			</p>
		);

	return (
		<section className="p-2 lg:p-8">
			<article className="flex flex-col gap-6 border-3 border-green-light rounded-xl items-center p-4 md:max-w-[600px] md:mx-auto lg:max-w-[1000px] lg:border-4 lg:rounded-3xl lg:w-[75%]">
				<div className="flex flex-col gap-3 items-center">
					<Image src={challenge.game?.cover || ""} alt={challenge.name} />
					<H1Title size="h1-mobile">
						{challenge.name}{" "}
						<span className="text-sm font-normal md:text-p-tablet lg:text">
							{challenge.created_at}
						</span>
					</H1Title>
				</div>

				<p className="text-p-mobile md:text-p-tablet">
					{challenge.description}
				</p>

				<Link
					to={userInfo ? "/participations/partage" : "/auth"}
					className="text-sm bg-green-medium py-2 px-6 rounded-full uppercase font-bold w-auto mx-auto border-2 border-green-medium hover:bg-white hover:text-green-light hover:border-green-light md:text-base"
				>
					{userInfo
						? "Partager une vidéo"
						: "Se connecter pour partager une vidéo"}
				</Link>

				<div className="flex flex-col gap-6 items-center w-[90%] max-w-[370px] mx-auto md:w-[70%] lg:max-w-[800px]">
					{challenge.participations?.slice(0, 4).map((p) => (
						<div key={p.id} className="w-full">
							<div className="border border-green-light rounded-lg aspect-video">
								<ReactPlayer src={p.url} controls width="100%" height="100%" />
							</div>
							<div className="flex flex-col items-center mt-2">
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
					))}
					<Link
						to={`/challenges/${challenge.id}/participations`}
						className="text-sm bg-green-medium py-2 px-6 rounded-full uppercase font-bold w-auto mx-auto border-2 border-green-medium hover:bg-white hover:text-green-light hover:border-green-light md:text-base"
					>
						Voir plus
					</Link>
				</div>
			</article>
		</section>
	);
}
