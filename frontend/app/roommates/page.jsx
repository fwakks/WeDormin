"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import data from "./data.json";
import MapCard from "@/components/map-card";
import AiCard from "@/components/ai-card";
import { RoommateList } from "@/components/roommate-list";
import { useState, useEffect } from "react";
import { RoommateFilters } from "@/components/roommate-filters";
import { Loader2 } from "lucide-react";

export default function Page() {
  const cards = [
    {
      title: "WeFittin?",
      value: "YESSIR",
    },
  ];
  const [roommates, setRoommates] = useState([]);
  const [filteredRoommates, setFilteredRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoommates, setSelectedRoommates] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    minAge: 0,
    maxAge: 10000,
    major: "all",
    gender: "all",
  });

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchRoommates = async () => {
      setLoading(true);
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const roommatesResponse = await fetch(`${apiBaseUrl}/api/students`, {
          credentials: "include",
        });

        if (!roommatesResponse.ok) {
          throw new Error("Failed to fetch roommate data");
        }

        const roommateData = await roommatesResponse.json();

        const allRoommates = [...roommateData];
        setRoommates(allRoommates);
        setFilteredRoommates(allRoommates);
      } catch (error) {
        console.error("Error fetching roommate data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoommates();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true);
      try {
        // Build query string based on filters
        const queryParams = new URLSearchParams();

        if (filters.minAge > 0)
          queryParams.append("minAge", filters.minAge.toString());
        if (filters.maxAge < 10000)
          queryParams.append("maxAge", filters.maxAge.toString());
        if (filters.major !== "all") queryParams.append("major", filters.major);
        if (filters.gender !== "all")
          queryParams.append("gender", filters.gender);

        const response = await fetch(
          `/api/students/filter?${queryParams.toString()}`
        );
        const data = await response.json();

        setFilteredRoommates(data);
        setCurrentPage(1); // Reset to first page when filters change
      } catch (error) {
        console.error("Error applying filters:", error);
        // Fallback to client-side filtering if API fails
        const filtered = roommates.filter((roommate) => {
          return (
            roommate.age >= filters.minAge &&
            roommate.age <= filters.maxAge &&
            (filters.major === "all" || roommate.major === filters.major) &&
            (filters.gender === "all" || roommate.gender === filters.gender)
          );
        });
        setFilteredRoommates(filtered);
      } finally {
        setLoading(false);
      }
    };

    if (roommates.length > 0) {
      applyFilters();
    }
  }, [filters, roommates]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleRoommateSelect = (r) => {
    setSelectedHousing(r);
  };

  const handleCloseDetail = () => {
    setSelectedRoommates(null);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredRoommates.length / itemsPerPage);
  const paginatedRoommates = filteredRoommates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader>Roommates</SiteHeader>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <AiCard cards={cards}></AiCard>
              </div>
              <div className="px-4 lg:px-6">
                <RoommateFilters
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
              </div>
              <div className="px-4 lg:px-6">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <RoommateList
                    roommates={paginatedRoommates}
                    onSelect={handleRoommateSelect}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </div>
              <SectionCards cards={cards} width={1} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
