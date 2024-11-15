import React, { useEffect, useRef, useState } from "react";
import hyderabad from "../assets/hyderabadBG.jpg";
import cloud from "../assets/cloud.webp";
import main from "../assets/main.webp";
import Logo from "../assets/LogoWhite.png";
import chennaiBG from "../assets/chennaiBG.png";
import SVGLines from "../components/SVGLines";
import SVGText from "../components/SVGText";
import mexicoImg from "../assets/mexico.png";
import hyderabadImage from "../assets/hyderabadpng.png";
const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const lastLetterRef = useRef(null); // Reference for the last letter
  const [transformOrigin, setTransformOrigin] = useState("left bottom");
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is in view
      }
    );

    // Observe the section
    const sectionElement = document.getElementById("scaled-section");
    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      // Cleanup the observer on component unmount
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getTextSize = () => {
    if (windowWidth <= 640) return `${windowWidth / 15}px`;
    if (windowWidth <= 1024) return `${windowWidth / 12}px`;
    if (windowWidth <= 1250) return `${windowWidth / 15}px`;
    return `${windowWidth / 10}px`;
  };

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

  const lastLetterDelay = (text.length - 1) * 150;
  const shouldExpandSecondSection = scrollPosition > lastLetterDelay;

  useEffect(() => {
    if (lastLetterRef.current) {
      const rect = lastLetterRef.current.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      setTransformOrigin(`${originX}px ${originY}px`);
    }
  }, [scrollPosition, windowWidth]);

  return (
    <div>
      <section className="relative h-[300vh] bg-cover bg-center bg-fixed -z-10" style={{
        background: "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)"
      }}>
        <div className="fixed top-10 w-full flex justify-center">
          <img className="self-center w-[200px]" src={Logo} alt="Logo" />
        </div>

        <div className="fixed bottom-0 left-0 flex items-center justify-center w-full">
          <h1
            className="text-white font-[900] opacity-80 flex w-[100vw] justify-between"
            style={{
              fontSize: getTextSize(),
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
                    ? `${parseInt(getTextSize()) + 60}px`
                    : getTextSize(),
                transitionDelay: `${index * 0.1}s`,
                ...(scrollPosition > delay && {
                  backgroundImage: `url(${letter.image})`,
                }),
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "inline-block",
                WebkitBackgroundClip: scrollPosition > delay ? "text" : "none",
                color: scrollPosition > delay ? "transparent" : "white",
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
        <section
          className={`letter-i-container h-[100vh] sticky bottom-0 left-0 w-full transition-all duration-1000 ${
            scrollPosition > lastLetterDelay
              ? "scale-100 opacity-100 z-20"
              : "scale-0 opacity-0 -z-10"
          }`}
          style={{
            backgroundImage: `url(${chennaiBG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformOrigin: transformOrigin,
          }}
        >
          <div
            ref={containerRef}
            className="p-5 text-white relative h-[100%] w-[100%]"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <SVGText isVisible={scrollPosition > lastLetterDelay}></SVGText>
            <SVGLines isVisible={scrollPosition > lastLetterDelay} />
          </div>
        </section>
      </section>

      <section
        id="scaled-section"
        className={`h-[100vh] w-[100%] ${
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } transform transition-all duration-700 ease-in-out`}
      >
        <img
          className="h-[100%] w-[100%] object-fill"
          src={"https://esdy.in/hotcult-do-not-delete.jpg"}
          alt="mexico img"
        />
      </section>
    </div>
  );
};

export default Home;
