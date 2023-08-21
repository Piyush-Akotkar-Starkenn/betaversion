import React, { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 30); // Show the button when scrolled down 30px
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Attach scroll event listener
  window.addEventListener("scroll", handleScroll);

  return (
    <button
      className={`top-button ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
    >
      <BsFillArrowUpCircleFill className="h-5 w-5 text-gray-950 dark:text-gray-50" />
    </button>
  );
};

export default TopButton;
