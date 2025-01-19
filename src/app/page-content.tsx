"use client";

import { useRef, useState } from "react";
import { BookOpenText, History } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateStory } from "@/components/generate-story";
import { StoryHistory } from "@/components/history";
import { Story } from "@/components/story";

export default function PageContent() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [storyName, setStoryName] = useState("");
  const [story, setStory] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const [activeTab, setActiveTab] = useState("generate");

  return (
    <div
      className={`w-full max-w-2xl lg:max-w-7xl ${
        story ? "grid grid-cols-1 lg:grid-cols-2" : ""
      } gap-8`}
    >
      <div className={`w-full ${!story ? "max-w-2xl mx-auto" : ""}`}>
        <Tabs
          defaultValue="generate"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 backdrop-blur-lg">
            <TabsTrigger
              value="generate"
              className="relative z-10 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BookOpenText className="w-5 h-5 mr-1" />
              Generate
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="relative z-10 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <History className="w-5 h-5 mr-1" />
              History
            </TabsTrigger>
            <div
              className="absolute left-0 top-0 h-full w-1/2 bg-[#3b82f6] rounded-md transition-transform duration-200 ease-out data-[state=history]:translate-x-full"
              data-state={activeTab}
            />
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <GenerateStory
              setStoryName={setStoryName}
              setStory={setStory}
              setCanSkip={setCanSkip}
              setTextCompleted={setTextCompleted}
              setIsStreaming={setIsStreaming}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <StoryHistory />
          </TabsContent>
        </Tabs>
      </div>

      {story && (
        <div className="w-full">
          <Story
            story={story}
            storyName={storyName}
            textContainerRef={textContainerRef}
            isStreaming={isStreaming}
            textCompleted={textCompleted}
            setTextCompleted={setTextCompleted}
            canSkip={canSkip}
          />
        </div>
      )}
    </div>
  );
}
