import imageGame1 from "../assets/images/dofuscover.jpg";
import imageGame2 from "../assets/images/animalcrossingcover.jpg";
import imageGame3 from "../assets/images/reddeadcover.jpg";
import imageGame4 from "../assets/images/cyberpunkcover.jpeg";
import imageGame5 from "../assets/images/disneydreamlightcover.jpg";
import imageGame6 from "../assets/images/gtacover.jpg";
import imageGame7 from "../assets/images/tekken8cover.jpg";
import imageGame8 from "../assets/images/mariokartcover.jpg";

export default function Challenges() {
  return (
    <>
      <section className="px-12 py-12">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Challenges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
          <article className="flex flex-col items-center">
            <img
              src={imageGame1}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 1
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame2}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 2
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame3}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 3
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame4}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 4
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame5}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 5
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame6}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 6
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame7}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 7
            </p>
          </article>

          <article className="flex flex-col items-center">
            <img
              src={imageGame8}
              alt=""
              className="w-48 h-48 rounded-lg border-4 border-green-light object-cover 
              transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl"
            />
            <p className="text-white font-medium text-center mt-3">
              Challenge 8
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
