import { ChevronDownIcon } from "lucide-react";
import LetterAvatar from "@/components/LetterAvatar";
import DropDownLinks from "@/components/sidebar/DropDownLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/features/auth/_components/Logout";

export default function DropDownUser({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image?: string | null;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar className="size-10">
            {image ? (
              <AvatarImage src={image} alt="Profile image" />
            ) : (
              <AvatarFallback className="font-semibold">
                <LetterAvatar name={name} />
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
        <DropDownLinks />
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
