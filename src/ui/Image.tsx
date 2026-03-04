type ImageProps = {
	src: string;
	alt?: string;
};

const Image = ({ src, alt = "" }: ImageProps) => {
	return (
		<div className="relative flex justify-center items-center overflow-visible w-[200px] h-[120px]">
			<div className="absolute left-1/2 -translate-x-1/2 w-16 -top-3 -bottom-3 bg-green-medium opacity-100 blur-2xl rounded-2x1 z-0" />

			<img
				src={src}
				alt={alt}
				className="relative z-10 w-[200px] h-[120px] object-cover rounded-xl border-2 border-green-medium"
			/>
		</div>
	);
};

export default Image;
