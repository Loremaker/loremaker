"use client";

import { useEffect, useRef, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { captureException } from "@sentry/nextjs";
import { FastForward } from "lucide-react";

import { LOADING_MESSAGES } from "@/constants";
import { LogoText } from "@/components/logo-text";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Typewriter } from "@/components/typewriter";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  contractAddress: z
    .string({
      required_error: "Contract address is required",
      invalid_type_error: "Contract address must be a string",
    })
    .refine((value) => PublicKey.isOnCurve(value), {
      message: "Invalid contract address",
    }),
});

const getRandomLoadingMessage = () => {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
};

type FormSchema = z.infer<typeof schema>;

async function handleStreamResponse(
  response: Response,
  {
    onStart = () => console.log("Stream started"),
    onChunk = (chunk: string) => console.log(chunk),
    onError = (error: Error) => console.error(error),
    onFinish = () => console.log("Stream complete"),
    textDecoder = new TextDecoder(),
  }: {
    onStart?: () => void;
    onChunk?: (chunk: string) => void;
    onError?: (error: Error) => void;
    onFinish?: () => void;
    textDecoder?: TextDecoder;
  } = {}
) {
  try {
    if (!response.ok) {
      throw new Error(`Bad response status: ${response.status}`);
    } else if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    let completeText = "";

    onStart();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onFinish();
        break;
      }

      const chunk = textDecoder.decode(value);
      completeText += chunk;
      onChunk(chunk);
    }

    return completeText;
  } catch (error) {
    onError(error as Error);
    onFinish();
  }
}

export default function PageContent() {
  const { toast } = useToast();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [storyName, setStoryName] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [textCompleted, setTextCompleted] = useState(false);
  const form = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ contractAddress }: FormSchema) => {
    setStoryName("");
    setStory("");

    try {
      const [storyName, response] = await Promise.all([
        fetch(`/api/story/name/${contractAddress}`).then((res) =>
          res.json().then((data) => data.storyName)
        ),
        fetch(`/api/story`, {
          method: "POST",
          body: JSON.stringify({ contractAddress }),
          keepalive: true,
          headers: {
            "Content-Type": "text/plain",
            Connection: "keep-alive",
            "Keep-Alive": "timeout=60",
          },
        }),
      ]);

      setStoryName(storyName);

      handleStreamResponse(response, {
        onStart: () => {
          setTextCompleted(false);
          setIsLoading(true);
        },
        onChunk: (chunk) => {
          setStory((prev) => (prev ? prev + chunk : chunk));
        },
        onFinish: () => {
          setIsLoading(false);
        },
        onError: (error) => {
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
    <main className="flex min-h-screen flex-col items-center justify-start py-24 px-8 sm:px-12 lg:px-24">
      <nav className="w-full max-w-4xl mb-8">
        <div className="text-5xl text-center font-bold">
          <LogoText />
        </div>
      </nav>

      <h1 className="text-4xl font-bold mb-2">Meme Coin Folk-lore Generator</h1>
      <p className="text-xl text-blue-400 mb-8">
        Unleash the power of AI to create legendary tales for your meme coins!
      </p>

      <Card className="w-full max-w-2xl bg-gray-900 border-blue-500">
        <CardContent className="p-6">
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
                disabled={!form.formState.isValid}
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

      {story && (
        <Card ref={textContainerRef} className="w-full max-w-2xl mt-8">
          <CardContent className="p-6">
            {!isLoading && !textCompleted && (
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  disabled={!form.formState.isValid}
                  onClick={() => setTextCompleted(true)}
                  title="Skip to the end"
                >
                  <FastForward className="w-5 h-5" />
                </Button>
              </div>
            )}
            <div className="flex justify-between items-center py-4 max-h-[400px] overflow-y-auto">
              <h2 className="text-2xl font-bold">
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
      )}
    </main>
  );
}
