import React, { useEffect, useRef, useState } from "react";
import hyderabad from "../assets/hyderabadBG.jpg";
import cloud from "../assets/cloud.webp";
import main from "../assets/main.webp";
import Logo from "../assets/Hotcult-Logo.png";
import chennaiBG from "../assets/chennaiBG.png";
import SVGLines from "../components/SVGLines";
import SVGText from "../components/SVGText";
import useResponsiveTextSize from "../hooks/useResponsiveTextSize";

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const textSize = useResponsiveTextSize();
  const lastLetterRef = useRef(null);
  const [transformOrigin, setTransformOrigin] = useState("left bottom");
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);




  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const text = [
    { text: "C", image: hyderabad },
    { text: "H", image: main },
    { text: "E", image: hyderabad },
    { text: "N", image: main },
    { text: "N", image: hyderabad },
    { text: "A", image: main },
    { text: "I", image: chennaiBG },
  ];

  const lastLetterDelay = (text.length - 1) * 200;
  const shouldExpandSecondSection = scrollPosition > lastLetterDelay;

  useEffect(() => {
    if (lastLetterRef.current) {
      const rect = lastLetterRef.current.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      setTransformOrigin(`${originX}px ${originY}px`);
    }
  }, [scrollPosition]);

  return (
    <div>
      <section className="relative h-[200vh] bg-cover bg-center bg-fixed">
        <div className="fixed top-10 w-full flex justify-center">
          <img className="self-center w-[200px]" src={Logo} alt="Logo" />
        </div>

        <div className="fixed bottom-0 left-0 flex items-center justify-center w-full">
          <h1
            className="text-black font-[900] opacity-80 flex w-[100vw] justify-between"
            style={{
              fontSize: textSize,
            }}
          >
            {[...text].map((letter, index) => {
              const delay = index * 100;
              const letterStyle = {
                transform: `translateY(${
                  scrollPosition > delay ? "-40vh" : "0px"
                })`,
                transition: "all 0.5s ease-out, opacity 0.7s ease-out",
                fontSize:
                  scrollPosition > delay
                    ? `${parseInt(textSize) + 60}px`
                    : textSize,
                transitionDelay: `${index * 0.1}s`,
                ...(scrollPosition > delay && {
                  backgroundImage: `url(${letter.image})`,
                }),
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "inline-block",
                WebkitBackgroundClip: scrollPosition > delay ? "text" : "none",
                color: scrollPosition > delay ? "transparent" : "black",
                padding: "0 5px",
                width: "auto",
                height: "auto",
                textAlign: "center",
              };

              // Add ref to the last letter "I"
              return (
                <span
                  key={index}
                  ref={letter.text === "I" ? lastLetterRef : null}
                  style={letterStyle}
                >
                  {letter.text}
                </span>
              );
            })}
          </h1>
        </div>
      </section>
      <section
        className={`bg-gray-400 h-[100vh] z-10 bg-cover transition-transform duration-700 ${
          shouldExpandSecondSection ? "scale-100" : "scale-0"
        }`}
        style={{
          backgroundImage: `url('${chennaiBG}')`,
          transformOrigin: transformOrigin,
        }}
      >
        <div
          ref={containerRef}
          className="p-5 text-white relative"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <SVGText isVisible={isVisible}></SVGText>
          <SVGLines isVisible={isVisible} />
        </div>
      </section>
    </div>
  );
};

export default Home;
