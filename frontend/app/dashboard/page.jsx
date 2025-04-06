'use client';

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { DetailView } from "@/components/detail-view"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Page() {
  const [user, setUser] = useState({ name: null, chosen_housing_id: null });
  const [housingData, setHousingData] = useState(null);
  const [roommateData, setRoommateData] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null); // 'roommate' or 'housing'

  // Fetch user data
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
          ruid: userData.ruid,
          chosen_housing_id: userData.chosen_housing_id || null, 
          chosen_student_id: userData.chosen_student_id || null
        })
        console.log("User data fetched successfully:", userData)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
  
    fetchUser()
  }, [])

  // Fetch housing data when chosen_housing_id is available
  useEffect(() => {
    const fetchHousingData = async () => {
      if (!user.chosen_housing_id) return;
      
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/housing/${user.chosen_housing_id}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch housing data");
        }
        
        const data = await response.json();
        setHousingData(data);
        console.log("Housing data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching housing data:", error);
      }
    };

    fetchHousingData();
  }, [user.chosen_housing_id]);

  // Fetch roommate data
  useEffect(() => {
    const fetchRoommateData = async () => {
      if (!user.ruid) return;
      
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const response = await fetch(`${apiBaseUrl}/api/students/${user.chosen_student_id}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch roommate data");
        }
        
        const data = await response.json();
        setRoommateData(data);
        console.log("Roommate data fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching roommate data:", error);
      }
    };

    fetchRoommateData();
  }, [user.ruid]);

  // Handle card clicks
  const handleCardClick = (type) => {
    setSelectedDetail(type);
  };

  // Close detail views
  const handleCloseDetail = () => {
    setSelectedDetail(null);
  };

  // Prepare cards data based on fetched information
  const cards = [
    {
      title: "Roommate",
      value: roommateData ? roommateData.name : "No roommate assigned",
      details: {
        major: roommateData?.major || "",
        classYear: roommateData?.classYear || "",
      },
      onClick: () => roommateData && handleCardClick('roommate')
    },
    {
      title: "Dorm",
      value: housingData ? housingData.name : "No housing assigned",
      details: {
        location: housingData?.location || "",
        type: housingData?.housing_type || "",
        capacity: housingData?.max_residents || "",
        term: "Click for more details"
      },
      onClick: () => housingData && handleCardClick('housing')
    }
  ];

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  // Determine which data to show in the detail view
  const getDetailData = () => {
    if (selectedDetail === 'roommate') {
      return roommateData;
    } else if (selectedDetail === 'housing') {
      return housingData;
    }
    return null;
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
                  <AvatarImage alt={user.name} />
                  <AvatarFallback className="rounded-lg text-4xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <p className="text-lg">{user.name || "User"}</p>
              </div>
              <SectionCards cards={cards} width={2} interactive={true} />
              
              <div className="px-4 lg:px-6">
                {/* Empty container for additional content */}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Render DetailView as a modal when needed */}
      {selectedDetail && getDetailData() && (
        <DetailView 
          data={getDetailData()} 
          type={selectedDetail} 
          onClose={handleCloseDetail}
          user={user} 
        />
      )}
    </SidebarProvider>
  );
}