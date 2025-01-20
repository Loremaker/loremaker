"use client";

import { useEffect, useState } from "react";
import { captureException } from "@sentry/nextjs";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const getSavedStories = () => {
  const stories: Story[] = [];

  for (let i = 0, len = localStorage.length; i < len; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("story-")) {
      const story = localStorage.getItem(key);
      if (story) {
        stories.push(JSON.parse(story));
      }
    }
  }
  return stories;
};

export function StoryHistory({
  loadStory,
}: {
  loadStory: (story: Story) => void;
}) {
  const { toast } = useToast();
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    try {
      setStories(getSavedStories());
    } catch (error) {
      console.error("Error parsing stories from localStorage:", error);
      captureException(error);
      setStories([]);
      toast({
        title: "Error",
        description:
          "Something went wrong loading your stories. Please try again.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stories.length === 0) {
    return (
      <Card className="flex flex-col h-full max-h-[600px] bg-gray-900 border-blue-500">
        <CardContent className="flex items-center justify-center h-[600px] text-muted-foreground">
          No stories generated yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full max-h-[600px] bg-gray-900 border-blue-500">
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[600px]">
          <div className="space-y-4 p-6">
            {stories.map((item, index) => (
              <Card
                key={`${item.contractAddress}-${index}`}
                className="p-4 hover:bg-muted/50 cursor-pointer shadow-md transition-shadow hover:shadow-lg"
                onClick={() => loadStory(item)}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg text-primary">
                    {item.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground font-mono truncate">
                      {item.contractAddress}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary/80">
                        {item.coin}
                      </span>
                    </p>
                  </div>
                </div>
                {item.timestamp && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
