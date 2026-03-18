import { useEffect, useState } from 'react'
import type { Challenge } from "../../types/models"
import { Link, useParams } from "react-router-dom"
import Image from "../../ui/Image";
import H1Title from "../../ui/H1Title";
import { FaHeart } from "react-icons/fa";
import ReactPlayer from 'react-player'
import H2 from "../../ui/H2";
import { useAuth } from "../../hooks/useAuth";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";

type ApiResponse = Challenge & { error?: string };

export default function ChallengeDetails() {
	// ---- Get id from params ----
	const { id } = useParams();

	// ---- STATES INITIALIZATION ----
	const [challenge, setChallenge] = useState<Challenge | null>(null);
	const [error, setErrors] = useState<string | null>(null);
	const [voteErrors, setVoteErrors] = useState<{ [key: number]: string }>({}); // check if user wants to vote for him/herself

	// check if user has
	const [votes, setVotes] = useState<{ [key: number]: boolean }>({});
	// loading state to prevent spam clicking on vote button
	const [loadingVote, setLoadingVote] = useState<{ [key: number]: boolean }>(
		{},
	);

	// ---- NAVIGATION ----
	const navigate = useNavigate();

	// ---- USER DATA ----
	const { userInfo, token, loadingUser } = useAuth();

	// ---- SHOW THE CHALLENGE SELECTED ----
	useEffect(() => {
		const fetchChallenge = async () => {
			const API_URL = import.meta.env.VITE_API_URL;

			setErrors(null);
			setChallenge(null);

			try {
				const response = await fetch(`${API_URL}/challenges/${id}`);
				const data: ApiResponse = await response.json();
				console.log("données reçues:", data);

				// Checking the server answer
				if (!response.ok) {
					throw new Error(data.error || "Impossible d'afficher ce challenge.");
				}

				// Get the raw data date from sequelize and transform it in Date object
				const rawDate = new Date(data.created_at);

				// Format the date in french
				const formattedDate = new Intl.DateTimeFormat("fr-FR")
					.format(rawDate)
					.replaceAll("/", ".");

				// Assign this new value to the key
				data.created_at = formattedDate;

				// Set challenge data in state
				setChallenge(data); // Store fetched challenge in state
			} catch (error) {
				if (error instanceof Error) {
					setErrors(error.message);
				} else {
					setErrors("Le serveur ne répond pas. Veuillez réessayer plus tard.");
				}
			}
		};

		if (id) fetchChallenge();
	}, [id]);

	//Check vote for each participation
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
					results[participation.id] = data.hasVoted; // Save vote status for this participation
				}

				setVotes(results); // Update local votes state
			} catch (error) {
				console.error(error);
			}
		};

		checkVotes();
	}, [userInfo, challenge]);

	// Handle vote (add/remove)
	const handleVote = async (participationId: number) => {
		if (!userInfo) {
			navigate("/auth"); // redirect to login if not connected
			return;
		}

		if (loadingVote[participationId]) return; // prevent spam clicks
		setLoadingVote((prev) => ({ ...prev, [participationId]: true })); // lock button

		const API_URL = import.meta.env.VITE_API_URL;
		const hasVoted = votes[participationId] ?? false; // default to false if undefined

		try {
			// Choix de la méthode POST ou DELETE selon l’état actuel
			const method = hasVoted ? "DELETE" : "POST";

			const response = await fetch(
				`${API_URL}/participations/${participationId}/vote`,
				{
					method,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const data = await response.json();

			// if error (vote for own participation)
			if (!response.ok) {
				setVoteErrors((prev) => ({ ...prev, [participationId]: data.message }));
				throw new Error(data.message);
			}

			// Reinitialize error if vote success
			setVoteErrors((prev) => {
				const next = { ...prev };
				delete next[participationId];
				return next;
			});

			// Update local vote
			setVotes((prev) => ({
				...prev,
				[participationId]: !hasVoted, // toggle vote
			}));

			// Update total amount of votes
			setChallenge((prev) => {
				if (!prev) return prev;

				return {
					...prev,
					participations: prev.participations?.map((participation) => {
						if (participation.id !== participationId) return participation;

						return {
							...participation,
							voteCounted: hasVoted
								? Number(participation.voteCounted) - 1 // remove vote
								: Number(participation.voteCounted) + 1, // add vote
						};
					}),
				};
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoadingVote((prev) => ({ ...prev, [participationId]: false })); // unlock button
		}
	};

	if (!challenge) {
		return <p>Chargement en cours</p>;
	}

	return (
		<section className="p-2 lg:p-8">
			{/* Container */}
			<article
				className="flex flex-col gap-6 border-3 border-green-light rounded-xl text-p-mobile items-center p-4
                md:max-w-[600px] md:mx-auto
                lg:max-w-[1000px] lg:border-4 lg:rounded-3xl lg:w-[75%]"
			>
				{/* Titles, date and image */}
				<div className="flex flex-col gap-3 items-center">
					<Image src={challenge.game?.cover || ""} alt={challenge?.name} />
					<H1Title size={"h1-mobile"} flex="flex flex-col">
						{challenge.name}
						<span className="text-sm font-normal md:text-p-tablet lg:text">
							{challenge.created_at}
						</span>
					</H1Title>
				</div>

				{/* DESCRIPTION AND LIKES PART */}
				<div className="flex flex-col items-center gap-4">
					<p className="text-p-mobile md:text-p-tablet">
						{challenge.description}
					</p>

					{userInfo ? (
						<Link
							to={`/participations/partage`}
							className={`text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium
                                    hover:bg-white hover:text-green-light hover:border-green-light md:text-base`}
						>
							Partager une vidéo
						</Link>
					) : (
						<Link
							to={`/auth`}
							className={`text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium
                                    hover:bg-white hover:text-green-light hover:border-green-light md:text-base`}
						>
							Se connecter pour partager une vidéo
						</Link>
					)}
				</div>

				{/* PARTICIPATIONS */}
				<div className="flex flex-col gap-6 items-center w-[90%] max-w-[370px] mx-auto md:grid-cols-2 md:w-[70%] md:max-w-[600px] lg:max-w-[800px]">
					<H2 label="Participations des autres joueurs" />
					<div className="grid grid-cols-1 gap-6 w-full lg:grid-cols-2">
						{challenge.participations
							?.slice(0, 4)
							.map((participation, index) => (
								<div key={participation.id} className="w-full">
									{/* ReactPlayer component used to show video from youtube */}
									<div
										className={`border border-green-light rounded-lg
						${index === 1 ? "hidden md:block" : ""} 
						${index === 2 ? "hidden lg:block" : ""} 
						${index === 3 ? "hidden lg:block" : ""}`}
									>
										<div className="aspect-video w-full">
											<ReactPlayer
												src={participation.url}
												controls
												width="100%"
												height="100%"
											/>
										</div>
									</div>

									{/* Vote Button */}
									<div className="flex flex-col items-center">
										<div className="flex items-center gap-2 mt-1">
											<span>{Number(participation.voteCounted) || 0}</span>
											{loadingUser ? (
												<FaHeart className="text-gray-400 animate-pulse" />
											) : userInfo ? (
												<FaHeart
													className={`cursor-pointer text-[18px] ${
														votes[participation.id]
															? "text-red-500"
															: "text-white"
													}`}
													onClick={() =>
														!loadingVote[participation.id] &&
														handleVote(participation.id)
													}
												/>
											) : (
												<FaHeart
													className="text-gray-400"
													title="Connectez-vous pour voter"
												/>
											)}
										</div>

										{/* Error message if vote on own participation */}
										{voteErrors[participation.id] && (
											<ErrorSummary
												errors={{ vote: voteErrors[participation.id] }}
											/>
										)}
									</div>
								</div>
							))}
					</div>

					<Link
						to={`/challenges/${challenge.id}/participations`}
						className={`text-sm bg-green-medium py-2 px-6 rounded-full cursor-pointer uppercase font-bold w-auto mx-auto border-2 border-green-medium
                            hover:bg-white hover:text-green-light hover:border-green-light md:text-base`}
					>
						Voir plus
					</Link>
				</div>
			</article>
		</section>
	);
}
