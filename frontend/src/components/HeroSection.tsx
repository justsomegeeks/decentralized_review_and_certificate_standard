import { joinClasses } from "../helpers";

const HeroSection = () => {
  return (
    <div className="shadow-md -z-10">
      <div className="grid max-w-5xl mx-auto md:grid-cols-2">
        <div className="flex flex-col items-center pt-0 ">
          <h1
            className={joinClasses(
              "text-5xl",
              "font-extrabold",
              "text-gray-700",
              "mt-12",
              "leading-14",
              "tracking-wide"
            )}
          >
            Review Bootcamps, and Certify Graduates like never before.
          </h1>

          <p
            className={joinClasses(
              "text-lg",
              "text-gray-500",
              "leading-14",
              "tracking-wider"
            )}
          >
            Helping bootcamps to certify graduates in a transparent way to
            enable skill money lego's to be build around it.
          </p>
        </div>
        <div className="mt-5 ">
          <img
            src="/images/illustration.png"
            alt="heroimage"
            className=""
            width={700}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
