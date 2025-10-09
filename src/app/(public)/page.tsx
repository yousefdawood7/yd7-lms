import Link from "next/link";
import CardList from "@/app/(public)/_component/CardList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <>
      <section className="flex flex-col items-center gap-10">
        <Badge className="text-sm" variant={"outline"}>
          The Future of Online Education
        </Badge>
        <h1 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Elevate Your Learning Experience
        </h1>
        <p className="text-muted-foreground max-w-[950px] text-center text-xl tracking-tight">
          Discover a new way to learn with our innovative platform, interactive
          courses, and expert instructors. Join us today and unlock your full
          potential!
        </p>
      </section>

      <section className="flex gap-4">
        <Button asChild className="px-4 py-6">
          <Link href={"/login"}>Explore Courses</Link>
        </Button>
        <Button asChild className="px-4 py-6" variant={"outline"}>
          <Link href={"/login"}>Sign in</Link>
        </Button>
      </section>
      <article className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CardList />
      </article>
    </>
  );
}
