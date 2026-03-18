import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../../ui/Button";
import Image from "../../ui/Image";
import H2 from "../../ui/H2";

const API_URL = import.meta.env.VITE_API_URL;

function SearchPage() {
	const { search } = useLocation();
	const params = new URLSearchParams(search);

	const query = params.get("q")?.toLowerCase() || "";
	const category = params.get("category") || "Tous";

	const [games, setGames] = useState([]);
	const [challenges, setChallenges] = useState([]);
	const [users, setUsers] = useState([]);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchResults = async () => {
			setLoading(true);
			setError(null);
			setGames([]);
			setChallenges([]);
			setUsers([]);
			setLoading(true);
			setError(null);

			try {
				/* GAMES */
				if (category === "Jeux" || category === "Tous") {
					const res = await fetch(`${API_URL}/games`);
					const data = await res.json();
					const filteredGames = data.games.filter((game) =>
						game.title.toLowerCase().includes(query),
					);
					setGames(filteredGames);
				}

				/* CHALLENGES */
				if (category === "Challenges" || category === "Tous") {
					const res = await fetch(`${API_URL}/challenges`);
					const data = await res.json();
					const filteredChallenges = data.filter((challenge) =>
						challenge.name.toLowerCase().includes(query),
					);
					setChallenges(filteredChallenges);
				}

				/* USERS */ 
				if (category === "Joueurs" || category === "Tous") {
					const res = await fetch(`${API_URL}/users`);
					const data = await res.json();
					console.log(data);
					const filteredUsers = data.filter((user) =>
						user.username.toLowerCase().includes(query),
					);
					setUsers(filteredUsers);
				}
			} catch (err) {
				console.error(err);
				setError(
					"Une erreur est survenue lors de la récupération des données.",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchResults();
	}, [query, category]);

	const totalResults = games.length + challenges.length + users.length;

	return (
		<div className="p-6 flex flex-col items-center min-h-screen">
			<h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
				Recherche : {totalResults} résultat{totalResults > 1 ? "s" : ""}
			</h1>

			{loading && <p>Chargement...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{/* GAMES */}
			{(category === "Jeux" || category === "Tous") && (
				<section className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
					{" "}
					{games.length > 0 ? (
						games.map((game) => (
							<Link
								key={game.id}
								to={`/jeux/${game.id}`}
								className="flex flex-col items-center gap-2 p-4 rounded-lg w-full "
							>
								<Image src={game.cover} alt={game.title} />
								<div className="w-full truncate text-center">
									<H2>{game.title}</H2>
								</div>
							</Link>
						))
					) : (
						<p className="text-center">Aucun jeu trouvé</p>
					)}
				</section>
			)}

			{/* CHALLENGES */}
			{(category === "Challenges" || category === "Tous") && (
				<section className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
					{challenges.length > 0 ? (
						challenges.map((challenge) => (
							<Link
								key={challenge.id}
								to={`/challenges/${challenge.id}`}
								className="flex flex-col items-center gap-2 p-4 rounded-lg w-full"
							>
								<Image src={challenge.game.cover} alt={challenge.name} />
								<div className="w-full truncate text-center">
									<H2>{challenge.name}</H2>
								</div>
							</Link>
						))
					) : (
						<p className="text-center">Aucun challenge trouvé</p>
					)}
				</section>
			)}

			{/* USERS */}
			{(category === "Joueurs" || category === "Tous") && (
				<section className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
					{users.length > 0 ? (
						users.map((user) => (
							<Link
								key={user.id}
								to={`/users/${user.id}`}
								className="flex flex-col items-center gap-2 p-4 rounded-lg w-full"
							>
								<Image src={user.avatar} alt={user.username} />
								<div className="w-full truncate text-center">
									<H2>{user.username}</H2>
								</div>
							</Link>
						))
					) : (
						<p className="text-center">Aucun joueur trouvé</p>
					)}
				</section>
			)}

			<div className="flex justify-center mt-10 w-full">
				<Link to="/">
					<Button label="Retour" type="button" />
				</Link>
			</div>
		</div>
	);
}

export default SearchPage;
