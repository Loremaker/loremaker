"use client";

import { FastForward } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typewriter } from "@/components/typewriter";

export function Story({
  story,
  storyName,
  textContainerRef,
  isStreaming,
  textCompleted,
  setTextCompleted,
  canSkip,
}: {
  story: string;
  storyName: string;
  textContainerRef: React.RefObject<HTMLDivElement | null>;
  isStreaming: boolean;
  textCompleted: boolean;
  setTextCompleted: (textCompleted: boolean) => void;
  canSkip: boolean;
}) {
  return (
    <Card ref={textContainerRef} className="h-full max-h-[600px]">
      <CardContent className="px-0 py-6 h-full flex flex-col">
        <div className="space-y-4 px-6">
          {(isStreaming || !textCompleted) && (
            <div className="flex justify-end">
              <Button
                variant="secondary"
                disabled={!canSkip || isStreaming}
                onClick={() => setTextCompleted(true)}
                title="Skip to the end"
              >
                <FastForward className="w-5 h-5" />
              </Button>
            </div>
          )}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-center underline px-32 lg:px-10">
              <Typewriter text={storyName} speed={95} />
            </h2>
          </div>
        </div>

        <ScrollArea className="flex-1 mt-8 px-16 lg:px-8">
          <div>
            <Typewriter
              text={story}
              speed={50}
              instant={textCompleted}
              onFinish={() => setTextCompleted(true)}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
