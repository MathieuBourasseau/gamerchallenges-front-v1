import type { ImageProps } from "../types/Image";

const Image = ({ src, alt = "Image indisponible" }: ImageProps) => {

  const styles = `
    border-3 border-green-light rounded-lg w-[120px] h-[100px] 
    object-cover object-center shadow-[0_0_15px_-2px_#70e61d,0_0_25px_-4px_#70e61d]
    md:w-[180px] md:h-[160px]
    lg:w-[220px] lg:h-[200px]
  `;

  if (!src) {
    return (
      <div 
        className={`${styles} flex items-center justify-center bg-gray-900 p-3`}
      >
        <span className="text-green-light text-center text-sm font-medium">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={styles}
    />
  );
};

export default Image;
