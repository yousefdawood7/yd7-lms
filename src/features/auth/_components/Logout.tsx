import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";
import { useName } from "@/app/(auth)/_contexts/NameContext";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export default function Logout() {
  const router = useRouter();
  const { resetName } = useName();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          resetName();
          toast.success("You're Signed Out Successfully");
          router.replace("/login");
        },
      },
    });
  }

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
