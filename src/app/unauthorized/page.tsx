import { ShieldX } from "lucide-react";
import Placeholder from "@/components/Placeholder";

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center">
      <Placeholder
        Icon={ShieldX}
        title="Access Restricted"
        description="You do not have permission to view this page."
      />
    </main>
  );
}
