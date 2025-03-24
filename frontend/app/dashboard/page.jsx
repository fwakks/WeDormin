'use client';

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Page() {
  const [user, setUser] = useState({ name: null })

  const cards = [
    {
      title: "Roommate",
      value: "John Smith"
    },
    {
      title: "Dorm",
      value: "Thomas Suites"
    }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/user`, {
          credentials: 'include'
        })
        if (!response.ok) {
          throw new Error("Failed to fetch user data")
        }
        const userData = await response.json()
        setUser({ 
          name: userData.name, 
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
  
    fetchUser()
  }, [])

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)"
        }
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader>Dashboard</SiteHeader>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 place-items-center px-4 lg:px-6">
                <Avatar className="h-24 w-24 rounded-lg grayscale">
                  <AvatarFallback className="rounded-lg text-4xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <p className="text-lg">{user.name || "User"}</p>
              </div>
              <SectionCards cards={cards} width={2}/>
              <div className="px-4 lg:px-6">
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
