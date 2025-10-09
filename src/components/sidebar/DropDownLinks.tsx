import Link from "next/link";
import { Home, LayoutDashboard, TvMinimalPlay } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function DropDownLinks() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href={"/"}>
          <Home size={16} className="opacity-60" aria-hidden="true" />
          <span>Home</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href={"/"}>
          <TvMinimalPlay size={16} className="opacity-60" aria-hidden="true" />
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
  );
}
