"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { LoaderCircle, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useSpinDelay } from "spin-delay";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";
import { DeleteUploadedImage } from "@/features/imageUploader/actions/actions";
import { type ActionType } from "@/features/imageUploader/slice/UploadedFileSlice";

export default function UploaderShowState({
  dispatch,
  onChange,
  imageUrl,
  objectUrl,
}: {
  dispatch: React.Dispatch<ActionType>;
  onChange: (imageUrl: string) => void;
  imageUrl: string;
  objectUrl: string;
}) {
  const [isTransitionPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const isPending = useSpinDelay(isTransitionPending, {
    delay: 300,
    minDuration: 350,
  });

  const handleDeleteImage = function (
    dispatch: React.ActionDispatch<[ActionType]>,
    onChange: (imageUrl: string) => void,
    imageUrl: string,
    objectUrl: string,
  ) {
    startTransition(async () => {
      try {
        await DeleteUploadedImage(imageUrl);
        toast.success("Image deleted successfully");
        dispatch({ type: "reset" });
        URL.revokeObjectURL(objectUrl);
        onChange("");
        startTransition(() => {
          setIsOpen(false);
        });
      } catch {
        toast.error("Failed to delete image. Please try again.");
      }
    });
  };

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-5">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="isolate z-1" asChild>
          <Button
            className="absolute top-5 right-5"
            variant={"destructive"}
            size={"icon-lg"}
          >
            <XIcon className="size-8" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="space-y-2.5">
            <DialogTitle> Delete Image</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="py-5.5" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="py-5.5 transition-colors"
              variant="destructive"
              onClick={handleDeleteImage.bind(
                null,
                dispatch,
                onChange,
                imageUrl,
                objectUrl,
              )}
            >
              {isPending ? (
                <>
                  Deleting <LoaderCircle className="animate-spin" />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <article className="flex h-full flex-col items-center justify-center">
        <ImageZoom className="relative h-[95%] w-xl overflow-hidden rounded-md py-5 sm:w-2xl">
          <Image
            src={objectUrl}
            className="object-contain"
            alt="uploaded image"
            fill
            unoptimized
          />
        </ImageZoom>
      </article>
    </div>
  );
}
