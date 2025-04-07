"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconLayoutDashboard,
  IconMessageCircle,
  IconSettings,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }) {
  // State to store user data
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "/avatars/default.jpg", // Default avatar
  });

  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
        const response = await fetch(`${apiBaseUrl}/api/user`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUser({
          name: userData.name || "User",
          email: userData.email || "",
          image: userData.image || "/avatars/default.jpg",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const data = {
    user: user,
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconLayoutDashboard,
      },
      {
        title: "Housing",
        url: "/housing",
        icon: IconHome,
      },
      {
        title: "Roommates",
        url: "/roommates",
        icon: IconUsers,
      },
      {
        title: "Chat",
        url: "/chat",
        icon: IconMessageCircle,
      },
      {
        title: "Profile",
        url: "/profile",
        icon: IconUser,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
              <img 
                src="/wedormin.png" 
                alt="WeDormin Logo" 
                className="size-6 object-contain" 
              />
                <span className="text-base font-semibold">WeDormin?</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {!isLoading && <NavUser user={data.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
