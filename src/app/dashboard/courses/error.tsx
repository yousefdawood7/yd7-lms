"use client";

import { Ban } from "lucide-react";
import Placeholder from "@/components/Placeholder";
import { Button } from "@/components/ui/button";

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="flex flex-1 items-center justify-center">
      <Placeholder
        Icon={Ban}
        title={"Something went wrong"}
        description={error.message}
        customButton={
          <Button
            className="w-full py-5.5"
            variant={"destructive"}
            onClick={() => reset()}
          >
            Try Again
          </Button>
        }
      />
    </section>
  );
}
