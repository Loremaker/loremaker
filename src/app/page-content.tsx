"use client";

import { useRef, useState } from "react";

import { LogoText } from "@/components/logo-text";
import { GenerateStory } from "@/components/generate-story";
import { Story } from "@/components/story";

export default function PageContent() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [storyName, setStoryName] = useState("");
  const [story, setStory] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-12 px-4 sm:px-12 lg:p-24">
      <nav className="w-full max-w-4xl mb-8">
        <div className="text-5xl text-center font-bold">
          <LogoText />
        </div>
      </nav>

      <div className="px-2 text-center">
        <h1 className="text-4xl font-bold mb-2">Meme Coin Story Generator</h1>
        <p className="text-xl text-blue-400 mb-8">
          Create your own crazy tales for your meme coins!
        </p>
      </div>

      <GenerateStory
        setStoryName={setStoryName}
        setStory={setStory}
        setCanSkip={setCanSkip}
        setTextCompleted={setTextCompleted}
        setIsStreaming={setIsStreaming}
      />

      <Story
        story={story}
        storyName={storyName}
        textContainerRef={textContainerRef}
        isStreaming={isStreaming}
        textCompleted={textCompleted}
        setTextCompleted={setTextCompleted}
        canSkip={canSkip}
      />
    </main>
  );
}
