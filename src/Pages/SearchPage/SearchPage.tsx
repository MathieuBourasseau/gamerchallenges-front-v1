import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "../../ui/Button";
import Image from "../../ui/Image";
import H1Title from "../../ui/H1Title";
import H2 from "../../ui/H2";
import type { ApiErrorResponse } from "../../types/forms";
import ErrorSummary from "../../ui/ErrorSummary";
import type { Game, Challenge, User } from "../../types/models";

const API_URL = import.meta.env.VITE_API_URL;

function SearchPage() {
  // Extract search parameters from the URL
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const query = params.get("q")?.toLowerCase() || "";
  const category = params.get("category") || "Tous";

  // State initialization for search results
  const [games, setGames] = useState<Game[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Partial<ApiErrorResponse>>({});

  // Fetch results whenever query or category changes
  useEffect(() => {
    const fetchResults = async () => {
      // Prevent fetching if the query is too short (matches backend validation)
      if (!query || query.length < 2) {
        setGames([]);
        setChallenges([]);
        setUsers([]);
        return;
      }

      // Reset states before fetching
      setLoading(true);
      setError({});

      try {
        // Map frontend categories to backend expected 'type' values
        let searchType = "all";
        if (category === "Jeux") searchType = "games";
        if (category === "Challenges") searchType = "challenges";
        if (category === "Joueurs") searchType = "users";

        // Call the backend search controller endpoint
        const res = await fetch(
          `${API_URL}/search?query=${query}&type=${searchType}`
        );
        const data = await res.json();

        // Handle HTTP errors
        if (!res.ok) throw data;

        // Dispatch the fetched data into the appropriate state variables
        if (searchType === "all") {
          // The backend returns a merged array with a 'type' property
          setGames(data.filter((item: any) => item.type === "game"));
          setChallenges(data.filter((item: any) => item.type === "challenge"));
          setUsers(data.filter((item: any) => item.type === "user"));
        } else if (searchType === "games") {
          setGames(data);
          setChallenges([]);
          setUsers([]);
        } else if (searchType === "challenges") {
          setChallenges(data);
          setGames([]);
          setUsers([]);
        } else if (searchType === "users") {
          setUsers(data);
          setGames([]);
          setChallenges([]);
        }
      } catch (err: any) {
        console.error("Search fetch error:", err);
        setError({
          statusCode: err.status || 500,
          server:
            err.error ||
            "Une erreur est survenue lors de la récupération des données.",
        });
      } finally {
        setLoading(false); // Stop the loading animation
      }
    };

    fetchResults();
  }, [query, category]);

  // Calculate the total number of results found
  const totalResults = games.length + challenges.length + users.length;

  return (
    <div className="p-6 flex flex-col items-center min-h-screen">
      <H1Title>
        Recherche : {totalResults} résultat{totalResults > 1 ? "s" : ""}
      </H1Title>

      <div className="w-full max-w-6xl mb-4">
        <ErrorSummary errors={error} />
      </div>

      {loading && !error.server && (
        <div className="flex justify-center my-4">
          <p className="text-white animate-pulse">Chargement en cours...</p>
        </div>
      )}

      {/* GAMES SECTION */}
      {(category === "Jeux" || category === "Tous") && (
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
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

      {/* CHALLENGES SECTION */}
      {(category === "Challenges" || category === "Tous") && (
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <Link
                key={challenge.id}
                to={`/challenges/${challenge.id}`}
                className="flex flex-col items-center gap-2 p-4 rounded-lg w-full"
              >
                <Image src={challenge.game?.cover || ""} alt={challenge.name} />
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

      {/* USERS SECTION */}
      {(category === "Joueurs" || category === "Tous") && (
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl">
          {users.length > 0 ? (
            users.map((user) => (
              <Link
                key={user.id}
                to={`/users/${user.id}`}
                className="flex flex-col items-center gap-2 p-4 rounded-lg w-full"
              >
                <Image src={user.avatar || ""} alt={user.username} />
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

      {/* RETURN BUTTON */}
      <div className="flex justify-center mt-10 w-full">
        <Link to="/">
          <Button label="Retour" type="button" />
        </Link>
      </div>
    </div>
  );
}

export default SearchPage;