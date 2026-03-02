import { ReactNode } from "react"; //nécessaire pour afficher ce qu'on indique entre les balises H1, sinon reste invisible

type H1TitleProps = {
	children: ReactNode;
};

const H1Title = ({ children }: H1TitleProps) => {
	return (
		<div className="w-full max-w-5xl mx-auto mb-6 text-center">
			<h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
				{children}
			</h1>
			<div
				className="mx-auto w-11/12" //liséré vert
				style={{
					height: "4px",
					background:
						"radial-gradient(ellipse 50% 100% at center, var(--color-green-medium) 0%, transparent 100%)",
				}}
			></div>
		</div>
	);
};

export default H1Title;
