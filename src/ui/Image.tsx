import type { ImageProps } from "../types/Image";

const Image = ({ src, alt = "Image indisponible", className }: ImageProps) => {

  const baseStyles = "border-3 border-green-light object-cover object-center shadow-[0_0_15px_-2px_#70e61d,0_0_25px_-4px_#70e61d]";
  
  const defaultDimensions = "rounded-lg w-[120px] h-[100px] md:w-[180px] md:h-[160px] lg:w-[220px] lg:h-[200px]";

  const finalClasses = `${baseStyles} ${className || defaultDimensions}`;

  if (!src) {
    return (
      <div 
        className={`${finalClasses} flex items-center justify-center bg-gray-900 p-3`}
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
      className={finalClasses}
    />
  );
};

export default Image;