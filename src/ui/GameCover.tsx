type GameImageProps = {
	src: string;
	alt: string;
};

const GameImage = ({ src, alt = "" }: GameImageProps) => {
	return (
		<img
			src={src}
			alt={alt}
			className={`w-[200px] h-[120px] object-cover rounded-md border-2 border-green-medium`}
		/>
	);
};

export default GameImage;
