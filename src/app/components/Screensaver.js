"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import { useScreensaverContext } from "../ScreensaverContext";

// List of quotes
const quotes = [
  {
    text: "Democracy is not merely a form of government. It is primarily a mode of associated living, of conjoint communicated experience.",
    author: "Dr. B.R. Ambedkar",
  },
  {
    text: "A democracy is not a static thing. It is a living force. It requires constant nurturing and action to ensure it does not wither away.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The forces of history and of our own growth combine to make us go forward. The future is ours to make.",
    author: "Jawaharlal Nehru",
  },
  {
    text: "The Constitution is the foundation of the country, and it ensures justice, liberty, equality, and fraternity.",
    author: "Dr. Rajendra Prasad",
  },
  {
    text: "What we really are matters more than what we say.",
    author: "Sardar Vallabhbhai Patel",
  },
  {
    text: "The spirit of democracy cannot be imposed from without. It has to come from within.",
    author: "M. K. Gandhi",
  },
  {
    text: "The Constitution is not a mere document; it is the foundation of the rule of law, which protects the rights of the individual.",
    author: "Nani Palkhivala",
  },
  {
    text: "The Constitution is a living document, meant to grow and develop with the changing needs of society.",
    author: "Justice V.R. Krishna Iyer",
  },
  {
    text: "Democracy is about the spirit of equality, of human dignity and the right to pursue one's own destiny.",
    author: "Vikram Sarabhai",
  },
  {
    text: "Democracy is not just a set of institutions; it is a way of life.",
    author: "Amartya Sen",
  },
];

const Screensaver = ({ idleTimeout = 15000, quoteInterval = 5000 }) => {
  const { screensaverDisabled, setScreensaverDisabled } =
    useScreensaverContext();
  const [isIdle, setIsIdle] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Idle detection logic
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), idleTimeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeoutId);
    };
  }, [idleTimeout]);

  // Quote rotation logic
  useEffect(() => {
    if (isIdle) {
      const quoteTimer = setInterval(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, quoteInterval);

      return () => clearInterval(quoteTimer); // Cleanup on component unmount or when idle ends
    }
  }, [isIdle, quoteInterval]);

  if (screensaverDisabled) return null;

  return (
    <>
      {isIdle && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Video background */}
          <video
            className="w-full h-full object-cover"
            src="./videos/indian_parliament.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* <Overlay animate /> */}
          {/* <div className="absolute bottom-5 z-20 w-full text-center px-4">
            <div className="bg-blue-500 bg-opacity-0 rounded-lg p-4">
              <p className="text-2xl font-serif italic text-yellow-300 transition-all duration-300 ease-in-out">
                &quot;{quotes[currentQuoteIndex].text}&quot;{" "}
              </p>
              <p className="mt-2 text-xl font-semibold text-gray-200">
                - {quotes[currentQuoteIndex].author}
              </p>
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Screensaver;
