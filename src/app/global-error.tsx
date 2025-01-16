"use client";

import { useEffect } from "react";
import { captureException } from "@sentry/nextjs";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full px-6 py-8 bg-card rounded-lg shadow-lg">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-destructive/10 p-3">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>

              <h1 className="text-2xl font-bold text-foreground">
                Something went wrong!
              </h1>

              <p className="text-muted-foreground">
                We apologize for the inconvenience. Our team has been notified
                and is working to fix the issue.
              </p>

              {process.env.NODE_ENV === "development" && (
                <div className="mt-4 p-4 bg-muted rounded text-left w-full">
                  <p className="text-sm font-mono text-muted-foreground">
                    {error.message}
                  </p>
                </div>
              )}

              <div className="flex space-x-4 mt-6">
                <Button
                  variant="default"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>

                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                >
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
