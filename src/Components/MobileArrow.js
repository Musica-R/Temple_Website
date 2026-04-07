"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function MobileArrow() {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showArrow && (
        <div className="scroll-top-arrow" onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}

      {/* CSS INSIDE JSX */}
      
      <style jsx>{`
        .scroll-top-arrow {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 38px;
          height: 38px;
          background-color: #8f261d;
          color: #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .scroll-top-arrow:hover {
          background-color:  #671310;
          transform: translateY(-4px);
        }

        .scroll-top-arrow :global(svg) {
          font-size: 15px;
        }
      `}</style>
    </>
  );
}
