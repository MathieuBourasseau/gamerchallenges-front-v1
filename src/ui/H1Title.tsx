import type { H1TitleProps } from "../types/titles";

const H1Title = ({ children, flex }: H1TitleProps) => {
	return (
		<div className="w-full max-w-5xl mx-auto mb-6 text-center">
			<h1 className={`
				${flex} uppercase text-white text-h1-mobile
				md:text-h1-tablet
				lg:text-h1-desktop lg:mb-4
				font-bold mb-2`}>
				{children}
			</h1>
			<div
				className="mx-auto w-11/12" //green line under title
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
