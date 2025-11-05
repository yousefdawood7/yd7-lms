import { BookX } from "lucide-react";
import Placeholder from "@/components/Placeholder";

export default function notFound() {
  return (
    <section className="flex flex-1 items-center justify-center">
      <Placeholder
        Icon={BookX}
        title="No Courses Found"
        description="We couldn't find any courses. Please check back later "
      />
    </section>
  );
}
