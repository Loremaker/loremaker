import { useState, useEffect, useRef } from "react";

export const Typewriter = ({
  text = "",
  speed = 50,
  instant = false,
  onFinish,
  reset = false,
}: {
  text?: string;
  speed?: number;
  instant?: boolean;
  onFinish?: () => void;
  reset?: boolean;
}) => {
  const fullTextRef = useRef(text);
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only update the ref when text changes, don't reset unless explicitly told
  useEffect(() => {
    fullTextRef.current = text;
  }, [text]);

  useEffect(() => {
    if (reset) {
      setDisplayText("");
      setCurrentIndex(0);
    }
  }, [reset]);

  useEffect(() => {
    if (instant) {
      setDisplayText(fullTextRef.current);
      setCurrentIndex(fullTextRef.current.length);
      return;
    }

    if (
      fullTextRef.current.length > 0 &&
      currentIndex < fullTextRef.current.length
    ) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + fullTextRef.current[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    }

    if (currentIndex === fullTextRef.current.length && onFinish) {
      onFinish();
    }
  }, [currentIndex, speed, onFinish, instant]);

  if (fullTextRef.current.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="font-mono relative min-h-[1.2em]">
      <span>{displayText}</span>
      <span className="w-[0.3em] h-[1.2em] bg-accent inline-block ml-1 animate-cursor" />
    </div>
  );
};
