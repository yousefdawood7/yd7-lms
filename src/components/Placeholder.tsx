import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PlaceholderProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
  customButton?: React.ReactNode;
};

export default function Placeholder({
  Icon,
  title,
  description,
  customButton,
}: PlaceholderProps) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-col items-center justify-center gap-y-6">
        <aside className="bg-destructive/45 rounded-full p-3.5">
          <Icon className="text-destructive size-20" />
        </aside>

        <CardTitle className="text-xl tracking-tighter">{title}</CardTitle>
        <CardDescription className="tracking-tight">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter>
        {customButton || (
          <Button className="py-5.5" asChild variant={"destructive"}>
            <Link href={"/"} className="w-full">
              <ArrowLeft />
              Go to Home
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
