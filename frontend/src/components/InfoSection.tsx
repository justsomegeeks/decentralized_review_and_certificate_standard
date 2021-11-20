import { joinClasses } from "../helpers";

const InfoSection = () => {
  return (
    <section className={joinClasses("py-12", "bg-gray-50", "shadow-sm")}>
      <div className="max-w-5xl mx-auto ">
        <h1
          className={joinClasses(
            "text-center",
            "text-4xl",
            "font-bold",
            "pb-8",
            "text-gray-700",
            "tracking-wider"
          )}
        >
          OpenCred and it's vision
        </h1>
        <div
          className={joinClasses(
            "flex",
            "bg-gray-100",
            "p-12",
            "rounded-md",
            "shadow-md"
          )}
        >
          <p
            className={joinClasses(
              "font-medium",
              "leading-7",
              "text-gray-800",
              "tracking-wider"
            )}
          >
            To help you get certified in a transparent way and to provide you
            ability to review bootcamps that you have graduated from. OpenCred
            is building a certification standard and review protocol to help
            bring transparency in education institutions.
          </p>
          <img
            src="/images/flyer.png"
            alt="batch"
            className={joinClasses("w-44", "h-48", "ml-5")}
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
