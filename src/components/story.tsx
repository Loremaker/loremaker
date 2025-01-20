"use client";

import { useEffect } from "react";
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
  reset,
  setReset,
}: {
  story: string;
  storyName: string;
  textContainerRef: React.RefObject<HTMLDivElement | null>;
  isStreaming: boolean;
  textCompleted: boolean;
  setTextCompleted: (textCompleted: boolean) => void;
  canSkip: boolean;
  reset: boolean;
  setReset: (reset: boolean) => void;
}) {
  useEffect(() => {
    if (reset) {
      setTextCompleted(false);
      setReset(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <Card ref={textContainerRef} className="h-full max-h-[600px]">
      <CardContent className="px-0 py-6 h-full flex flex-col">
        <div className="space-y-4 px-6">
          {(isStreaming || !textCompleted) && (
            <div className="flex justify-end">
              <Button
                disabled={!canSkip || isStreaming}
                onClick={() => setTextCompleted(true)}
                title="Skip to the end"
              >
                <FastForward className="w-5 h-5" />
              </Button>
            </div>
          )}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl mx-auto font-bold text-center underline px-32 lg:px-10">
              <Typewriter text={storyName} speed={95} reset={reset} />
            </h2>
          </div>
        </div>

        <ScrollArea className="flex-1 mt-8 px-8">
          <div>
            <Typewriter
              text={story}
              speed={10}
              instant={textCompleted}
              onFinish={() => setTextCompleted(true)}
              reset={reset}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
