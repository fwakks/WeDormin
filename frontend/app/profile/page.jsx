import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "../dashboard/data.json"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ProfileTab from "@/components/profile-tab"
import ProfileList from "@/components/profile-list"

export default function Page() {
  const cards = [
    {
      title: "Roommates",
      value: "YESSIR"
    },
    {
      title: "Dorm",
      value: "YESSIR"
    }
  ];
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
        <SiteHeader>Profile</SiteHeader>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 place-items-center px-4 lg:px-6">
                <Avatar className="h-24 w-24 rounded-lg grayscale">
                  <AvatarImage src={"/globe.svg"} alt={"globe"} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <p className="text-lg">John Doe</p>
              </div>
              <ProfileList></ProfileList>
              <div className="flex justify-center px-4 lg:px-6">
                <Button>Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
