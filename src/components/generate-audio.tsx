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

interface GenerateAudioProps {
  story: string;
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
  canSkip,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      setError("No story available to generate audio.");
      return;
    }

    setLoading(true);
    setError(null);
    setAudioUrl(null);

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
      setError(error.message || "An unexpected error occurred.");
      captureException(error);
    } finally {
      setLoading(false);
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
          disabled={loading || !story || !canSkip}
          variant="default"
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Generating audio...
            </>
          ) : (
            "Generate Audio"
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {!canSkip && (
          <p className="text-sm text-muted-foreground">
            Please wait until the story generation is complete to generate
            audio.
          </p>
        )}

        {error && (
          <p className="text-sm font-medium text-destructive">Error: {error}</p>
        )}

        {audioUrl && (
          <div className="rounded-md border p-4 bg-muted/50">
            <audio className="w-full" controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};
