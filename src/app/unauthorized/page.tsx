import Link from "next/link";
import { ArrowLeft, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex flex-col items-center justify-center gap-y-6">
          <aside className="bg-destructive/45 rounded-full p-3.5">
            <ShieldX className="text-destructive size-20" />
          </aside>

          <CardTitle className="text-xl tracking-tighter">
            Access Restricted
          </CardTitle>
          <CardDescription className="tracking-tight">
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button className="py-5.5" asChild variant={"destructive"}>
            <Link href={"/"} className="w-full">
              <ArrowLeft />
              Go to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
