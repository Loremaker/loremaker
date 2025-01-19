import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FastForward } from "lucide-react";
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
  if (!story) return null;

  return (
    <Card ref={textContainerRef} className="w-full max-w-2xl mt-8">
      <CardContent className="p-6">
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
        <div className="flex justify-between items-center py-4 max-h-[400px] overflow-y-auto">
          <h2 className="text-2xl font-bold text-center px-2 lg:px-8">
            <Typewriter text={storyName} speed={95} />
          </h2>
        </div>
        <div className="py-4 max-w-2xl mx-auto space-y-8">
          <Typewriter
            text={story}
            speed={30}
            instant={textCompleted}
            onFinish={() => setTextCompleted(true)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
