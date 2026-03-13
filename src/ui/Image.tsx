type ImageProps = {
	src: string;
	alt?: string;
};

const Image = ({ src, alt = "" }: ImageProps) => {
	return (
		<img 
			src={src} 
			alt={alt} 
			className="
                border-3 border-green-light rounded-lg w-[120px] h-[100px] object-cover object-center shadow-[0_0_15px_-2px_#70e61d,0_0_25px_-4px_#70e61d]
				md:w-[180px] md:h-[160px]
				lg:w-[220px] lg:h-[200px]
            "
		/>
	);
};

export default Image;
