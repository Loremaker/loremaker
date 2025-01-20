import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureException } from "@sentry/nextjs";

import { LOADING_MESSAGES } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { StreamHandler } from "@/lib/stream-handler";

const schema = z.object({
  contractAddress: z.string({
    required_error: "Contract address is required",
    invalid_type_error: "Contract address must be a string",
  }),
});

const getRandomLoadingMessage = () => {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
};

const storeStory = (story: Story) => {
  localStorage.setItem(
    `story-${story.contractAddress}-${story.timestamp}`,
    JSON.stringify(story)
  );
};

type FormSchema = z.infer<typeof schema>;

export function GenerateStory({
  setStoryName,
  setStory,
  setCanSkip,
  setIsStreaming,
  setReset,
  onStartStreaming,
}: {
  setStoryName: (storyName: string) => void;
  setStory: React.Dispatch<React.SetStateAction<string>>;
  setCanSkip: (canSkip: boolean) => void;
  setIsStreaming: (isStreaming: boolean) => void;
  setReset: (reset: boolean) => void;
  onStartStreaming: () => void;
}) {
  const { toast } = useToast();
  const [loadingMessage, setLoadingMessage] = useState("");
  const form = useForm<FormSchema>({ resolver: zodResolver(schema) });
  let storyChunks = "";

  const onSubmit = async ({ contractAddress }: FormSchema) => {
    try {
      new PublicKey(contractAddress);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      form.setError("contractAddress", {
        message: "Invalid contract address",
      });
      return;
    }

    try {
      const storyNameResponse = await fetch(
        `/api/story/name/${contractAddress}`
      );
      const { storyName, coin } = await storyNameResponse.json();
      if (!storyName) {
        form.setError("contractAddress", {
          message: "No coin found with that address",
        });
        return;
      }

      // Once we have the story name, we know the coin exists
      setCanSkip(false);
      const storyResponse = await fetch(`/api/story`, {
        method: "POST",
        body: JSON.stringify({ contractAddress }),
        keepalive: true,
        headers: {
          "Cache-Control": "no-cache", // Prevent caching to be able to generate a new one
          "Content-Type": "text/plain",
          Connection: "keep-alive",
          "Keep-Alive": "timeout=60",
        },
      });

      setStoryName(storyName);
      setStory("");

      await StreamHandler(storyResponse, {
        onStart: () => {
          storyChunks = "";
          onStartStreaming();
          toast({
            title: "Generating story...",
            description:
              "The content will be displayed as it is generated. Once it is complete, you can skip to the end and will be saved automatically.",
          });
        },
        onChunk: (chunk) => {
          setStory((prev) => (prev ? prev + chunk : chunk));
          storyChunks += chunk;
        },
        onFinish: () => {
          setIsStreaming(false);
          setCanSkip(true);
          setReset(false);
          storeStory({
            title: storyName,
            contractAddress,
            coin,
            timestamp: Date.now(),
            text: storyChunks,
          });
          toast({
            title: "Story generated",
            description:
              "You can skip to display the entire story. It is also saved in your history.",
          });
        },
        onError: (error) => {
          setReset(true);
          throw error;
        },
      });
    } catch (error) {
      console.error(error);
      captureException(error, { extra: { contractAddress } });
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  // While loading, update the loading message so it doesn't
  // look like the app is frozen and is more fun
  useEffect(() => {
    // Setting in useEffect to avoid hydration error
    setLoadingMessage(getRandomLoadingMessage());

    const interval = setInterval(() => {
      if (form.formState.isSubmitting) {
        setLoadingMessage(getRandomLoadingMessage());
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [form.formState.isSubmitting]);

  return (
    <Card className="w-full bg-gray-900 border-blue-500">
      <CardContent className="p-6 w-full">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-6"
            data-testid="login-form"
          >
            <FormField
              control={form.control}
              name="contractAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contract Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your meme coin contract address"
                      data-testid="contract-address-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              isLoading={form.formState.isSubmitting}
              loadingText={loadingMessage}
            >
              Generate
            </Button>

            {form.formState.isSubmitting && (
              <p className="text-sm text-muted-foreground text-center">
                Generating your meme coin story...
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
