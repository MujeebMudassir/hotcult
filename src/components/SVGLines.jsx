import React, { useEffect, useRef } from "react";

const SVGLines = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    // Initial path styling
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Start path animation only when scroll position exceeds 1000
      if (scrollPosition > 1000) {
        const offset = pathLength - ((scrollPosition - 1000) / 1000) * pathLength;
        path.style.strokeDashoffset = Math.max(offset, 0); // Ensure it doesn't go negative
      } else {
        // Reset to the initial position if scroll is less than 1000
        path.style.strokeDashoffset = pathLength;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <svg
      width={"calc(97vw - 1.25rem)"}
      height={"calc(97vh - 1.25rem)"}
      viewBox="0 0 1788 913"
      fill="none"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <path
        ref={pathRef}
        d="M2.5 646.5V292L302 357L2.5 210.5V9C2.33333 6.66667 3.4 2 9 2C14.6 2 390.667 2 578 2L500.5 194.5L775.5 2H1044C1045 2 1047 2.6 1047 5C1047 7.4 1047 18.6667 1047 24C1047.17 25 1048.4 27 1052 27C1055.6 27 1112.17 27 1140 27C1143 27 1149 25.6 1149 20C1149 14.4 1149 7.66667 1149 5C1149 4.16667 1149.8 2.5 1153 2.5C1156.2 2.5 1571.33 2.5 1778.5 2.5C1780.83 2.33333 1785.5 3.3 1785.5 8.5C1785.5 13.7 1785.5 24.3333 1785.5 29V389L1487.5 267.5L1785.5 503.5V787C1785.67 788.333 1784.6 791 1779 791C1773.4 791 1640 791 1574 791C1572.33 791 1569 792 1569 796C1569 800 1569 842.333 1569 863V906C1568.83 907.167 1567.6 909.6 1564 910C1560.4 910.4 1061.83 910.167 813 910"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
};

export default SVGLines;
