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
    <>
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
    </>
  );
}
