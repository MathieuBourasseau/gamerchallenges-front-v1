type User = {
	id: number;
	username: string;
	email: string;
	avatar?: string;
};

type Game = {
	id: number;
	title: string;
	cover: string;
};

type Challenge = {
	id: number;
	name: string;
	game: Game;
};

type Participation = {
	id: number;
	title: string;
	url: string;
	user_id: number;
	challenge_id: number;
	voteCount: number;
	player: User;
	challenge: Challenge;
};

import { useState, useEffect } from "react";
import H1Title from "../../ui/H1Title";
import TitleImage from "../../assets/images/Title.png";
import backgroundImage from "../../assets/images/draw_team.png";
import Button from "../../ui/Button";
export default function Home() {
	const [bestParticipations, setBestParticipations] = useState<Participation[]>(
		[],
	);

	useEffect(() => {
		fetch("http://localhost:3000/")
			.then((res) => res.json())
			.then((data) => setBestParticipations(data));
	}, []);

	return (
		<>
			<div
				className="
    flex flex-row items-center justify-center gap-4 mx-auto
    md:grid md:grid-cols-2 md:gap-6
  "
			>
				<img
					src={TitleImage}
					alt="Title"
					className="w-80 md:w-72 lg:w-96 h-auto"
				/>

				<img
					src={backgroundImage}
					alt=""
					className="
      hidden md:block
      w-40 sm:w-56 md:w-72 lg:w-96 h-auto
    "
				/>
			</div>
			<section className="text-center px-6 py-12">
				<H1Title>Les vidéos les plus likées</H1Title>

				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-items-center max-w-6xl mx-auto">
					{bestParticipations.map((p) => (
						<article
							key={p.id}
							className="
    flex flex-col items-center 
    bg-green-light/20 
    rounded-lg p-2 
    w-48 sm:w-56 lg:w-64
  "
						>
							<a href={p.url} target="_blank" rel="noopener noreferrer">
								<img
									src={p.challenge.game.cover}
									alt={p.challenge.game.title}
									className="
        w-48 h-48 
        sm:w-56 sm:h-56 
        lg:w-64 lg:h-64
        rounded-lg mb-3 border-4 border-green-light 
        object-cover transition-transform duration-300 ease-out 
        hover:scale-105 hover:shadow-xl
      "
								/>
							</a>

							<p className="text-white font-medium text-center">
								{p.challenge.name}
							</p>
						</article>
					))}
				</div>
				<div className="flex justify-center mt-10">
					<Button
						label="Voir plus"
						type="button"
						onClick={() => (window.location.href = "/challenges")}
					/>
				</div>
			</section>
		</>
	);
}
