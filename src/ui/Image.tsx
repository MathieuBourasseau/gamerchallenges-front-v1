type ImageProps = {
	src: string;
	alt?: string;
};

const Image = ({ src, alt = "" }: ImageProps) => {
	return (
		<div className="relative flex justify-center items-center w-full max-w-[200px] aspect-[5/3] mx-auto">
			<div className="absolute left-1/2 -translate-x-1/2 w-1/4 -top-3 -bottom-3 bg-green-medium opacity-100 blur-2xl rounded-2xl z-0" />
			<img
				src={src}
				alt={alt}
				className="relative z-10 w-full h-full object-cover rounded-xl border-2 border-green-medium"
			/>
		</div>
	);
};

export default Image;
