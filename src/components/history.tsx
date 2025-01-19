"use client";

import { useEffect, useState } from "react";
import { captureException } from "@sentry/nextjs";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Story {
  title: string;
  contractAddress: string;
  coin: string;
  timestamp: number;
}

export function StoryHistory() {
  const [history, setHistory] = useState<Story[]>([]);

  useEffect(() => {
    const savedStories = localStorage.getItem("stories");
    if (savedStories) {
      try {
        const parsedStories = JSON.parse(savedStories);
        setHistory(Array.isArray(parsedStories) ? parsedStories : []);
      } catch (error) {
        console.error("Error parsing stories from localStorage:", error);
        captureException(error);
        setHistory([]);
      }
    }
  }, []);

  if (history.length === 0) {
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
            {history.map((item, index) => (
              <Card
                key={`${item.contractAddress}-${index}`}
                className="p-4 hover:bg-muted/50 cursor-pointer shadow-md transition-shadow hover:shadow-lg"
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
