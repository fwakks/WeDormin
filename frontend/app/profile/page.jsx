"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProfileList from "@/components/profile-list";
import ProfileEdit from "@/components/profile-edit";
import { useRouter } from "next/navigation";

export default function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchUser = async () => {
      try {
       
        const userResponse = await fetch(`${apiBaseUrl}/api/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const data = await userResponse.json();
        console.log("User data fetched:", data);
        setUserData(data);
      } catch (err) {
        console.error("Error in registration flow:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    FetchUser();
  }, [apiBaseUrl]);

  if (isLoading){
    return <p>Loading...</p>
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      setError("User data not available. Please try logging in again.");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    // Collect form data
    const formData = new FormData(event.target);
    const updates = {};
  
    formData.forEach((value, key) => {
      if (value) {
        // Convert numeric string values to numbers where needed
        if (key === "lottery_number" || key === "seniority_points" || key === "age") {
          updates[key] = Number(value);
        } else {
          updates[key] = value;
        }
      }
    });
  
    console.log("Updating user with data:", JSON.stringify(updates));
    
    try {
      // Send PATCH request to update the student
      const response = await fetch(`${apiBaseUrl}/api/students/${userData.ruid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${errorText}`);
      }
  
      // Update the local userData state with the new values
      setUserData(prevData => ({
        ...prevData,
        ...updates
      }));
  
      // Close the dialog if using modal version (optional)
      // You can add a state to control the dialog if needed
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader>Profile</SiteHeader>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="grid grid-cols-1 place-items-center px-4 lg:px-6">
                <Avatar className="h-24 w-24 rounded-lg">
                  <AvatarImage src={userData.image} alt={"globe"} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <p className="text-lg">{userData?.name || "Loading..."}</p>
              </div>
              <div className="flex justify-center px-4 lg:px-6">
                <ProfileEdit onSubmit={handleSubmit} isModal={true} userData = {userData}></ProfileEdit>
              </div>
              <ProfileList user={userData}></ProfileList>
             
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
