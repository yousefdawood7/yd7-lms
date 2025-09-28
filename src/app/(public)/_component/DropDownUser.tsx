import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Home,
  Layers2Icon,
  LayoutDashboard,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export default function DropDownUser({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image?: string | null;
}) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("You're Signed Out Successfully");
          router.replace("/login");
        },
      },
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-10">
            {image ? (
              <AvatarImage src={image} alt="Profile image" />
            ) : (
              <AvatarFallback>
                {name.split(" ")[0].slice(1).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <ChevronDownIcon
            size={16}
            className="size-6 opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {name}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <Home size={16} className="opacity-60" aria-hidden="true" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <BookOpenIcon
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/"}>
              <LayoutDashboard
                size={16}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
