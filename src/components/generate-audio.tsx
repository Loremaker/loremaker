"use client";

import React, { useState, useEffect } from "react";
import { captureException } from "@sentry/nextjs";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

import { AudioPlayer } from "./audio-player";

interface GenerateAudioProps {
  story: string;
  storyName: string;
  canSkip: boolean;
}

const speakers = [
  "Emily",
  "Grace",
  "Isabella",
  "Olivia",
  "Sophia",
  "Alexander",
  "Benjamin",
  "Ethan",
  "Lucas",
  "Noah",
] as const;

export const GenerateAudio: React.FC<GenerateAudioProps> = ({
  story,
  storyName,
  canSkip,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>(speakers[0]);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleGenerateAudio = async () => {
    if (!story) {
      return;
    }

    setIsLoading(true);
    setAudioUrl(null);
    toast({
      title: "Generating audio",
      description: (
        <span>
          The story <strong>{storyName}</strong> is being converted to audio for
          narration.
        </span>
      ),
    });

    try {
      const response = await fetch("/api/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: story,
          speaker: `${selectedSpeaker}.wav`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error ${response.status}: ${
            errorText || "Failed to generate audio."
          }`
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      const error = err as Error;
      console.error("Failed to generate audio:", error);
      captureException(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while generating audio.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="inline-flex gap-2">
        <Select value={selectedSpeaker} onValueChange={setSelectedSpeaker}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            {speakers.map((speaker) => (
              <SelectItem key={speaker} value={speaker}>
                {speaker}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleGenerateAudio}
          disabled={!story || !canSkip}
          isLoading={isLoading}
        >
          Generate Audio
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {!canSkip && (
          <p className="text-sm text-muted-foreground">
            Please wait until the story generation is complete to generate
            audio.
          </p>
        )}

        {audioUrl && <AudioPlayer src={audioUrl} />}
      </div>
    </div>
  );
};
