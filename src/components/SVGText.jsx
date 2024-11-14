import React, { useEffect, useState } from "react";

const SVGText = ({ isVisible }) => {
  const [animationState, setAnimationState] = useState(isVisible);

  // Reset the animation when isVisible changes
  useEffect(() => {
    if (isVisible) {
      // If visible is true, play the animation
      setAnimationState(true);
    } else {
      // If visible is false, reset the animation
      setAnimationState(false);
    }
  }, [isVisible]);

  const animateText = (text, delayStart = 0) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className={`inline-block transition-transform duration-300 ease-in-out ${
          animationState
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${delayStart + index * 200}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <>
      <h1 className="absolute top-[30%] right-2 font-bold rotate-90 origin-top-right text-2xl font-freckle">
        {animateText("SPOTLIGHT", 1000)}
      </h1>

      <h1
        className="absolute top-1/2 left-1/2 font-bold text-[100px] font-[Noto Sans Tamil]"
        style={{ transform: "translate(-50%, -50%)" }}
        lang="ta"
      >
        {animateText("சென்னை", 1000)}
      </h1>

      <div className="absolute bottom-6 left-5 font-bold text-[50px] text-center">
        <h1>{animateText("NAMMA", 1000)}</h1>
        <h1>{animateText("சென்னை", 1000)}</h1>
      </div>

      <h1 className="absolute top-5 left-5 font-bold text-2xl translate-x-1/2 translate-y-1/2">
        {animateText("we make it real!", 1000)}
      </h1>
      <h1 className="absolute right-[39.5%] top-0  text-xl translate-x-1/2 translate-y-1/2">
        {animateText("2024", 1000)}
      </h1>

      <h1 className="absolute bottom-6 right-[300px] font-bold text-2xl">
        {animateText("Break the rule", 1000)}
      </h1>

      <h1 className="absolute bottom-6 right-5 font-bold text-2xl">
        {animateText("Spring Edition", 1000)}
      </h1>
    </>
  );
};

export default SVGText;
