import React from "react";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent mt-auto w-full py-4 text-center uppercase">
      <div className="
                bg-[#034b57] rounded-full py-3 mx-3 font-bold text-[0.9rem] flex justify-center gap-4 mb-4 text-p-mobile
                md:text-p-tablet md:gap-12
                lg:gap-16 lg:py-5 lg:mx-8 lg:text-[1.17rem]">
        <Link to="/a-propos">a propos</Link>
        <Link to ="/mentions-legales">mentions legales</Link>
        <Link to="/contact">contact</Link>
      </div>  
      <p className="text-white font-bold text-xs
                    lg:text-lg">
        2026 - gamerschallenges
      </p>
    </footer>
  );
};