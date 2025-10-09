"use client";

import { type Route } from "next";
import Link from "next/link";
import { type Icon, IconCirclePlusFilled } from "@tabler/icons-react";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const logoStyles = {
  width: "1.2rem",
  height: "1.2rem",
};

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: Route;
    icon?: LucideIcon | Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              asChild
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <Link href={"/dashboard/courses/create"}>
                <IconCirclePlusFilled style={logoStyles} />
                <span className="text-lg">Quick Create</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                className="gap-3.5"
                asChild
              >
                <Link href={item.url}>
                  {item.icon && <item.icon style={logoStyles} />}
                  <span className="text-lg">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
