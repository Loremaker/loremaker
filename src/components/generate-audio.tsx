"use client";

import React, { useState, useEffect } from "react";

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
];

export const GenerateAudio: React.FC<GenerateAudioProps> = ({ story, canSkip }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(speakers[0]);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);

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
      let body: any = { text: story };

      if (uploadedAudio) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = (reader.result as string).replace(/^data:audio\/\w+;base64,/, "");
            resolve(result);
          };
          reader.onerror = reject;
        });

        reader.readAsDataURL(uploadedAudio);
        const base64Audio = await base64Promise;
        body.custom_speaker = base64Audio;
      } else {
        body.speaker = `${selectedSpeaker}.wav`;
      }

      const response = await fetch("/api/audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error ${response.status}: ${errorText || "Failed to generate audio."}`
        );
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      console.error("Failed to generate audio:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <label htmlFor="speaker" className="block mb-2 text-gray-700">
        Select Speaker:
      </label>
      <select
        id="speaker"
        value={selectedSpeaker}
        onChange={(e) => setSelectedSpeaker(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md"
        disabled={!!uploadedAudio}
      >
        {speakers.map((speaker) => (
          <option key={speaker} value={speaker}>
            {speaker}
          </option>
        ))}
      </select>

      <label htmlFor="audioUpload" className="block mb-2 text-gray-700">
        Or upload a custom speaker audio:
      </label>
      <input
        id="audioUpload"
        type="file"
        accept="audio/*"
        onChange={(e) => setUploadedAudio(e.target.files?.[0] || null)}
        className="mb-4 px-4 py-2 border rounded-md"
      />

      <button
        onClick={handleGenerateAudio}
        disabled={loading || !story || !canSkip}
        className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50`}
      >
        {loading ? "Generating..." : "Generate Audio"}
      </button>

      {!canSkip && (
        <p className="mt-2 text-gray-500">
          Please wait until the story generation is complete to generate audio.
        </p>
      )}

      {error && (
        <p className="mt-2 text-red-500">Error: {error}</p>
      )}

      {audioUrl && (
        <div className="mt-4">
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

// export default GenerateAudio;
