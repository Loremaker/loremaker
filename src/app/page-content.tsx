"use client";

import { useRef, useState } from "react";

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
    <main className="flex min-h-screen flex-col items-center justify-start mt-16 pb-12 pt-24 px-4 sm:px-12 lg:pt-24">
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
