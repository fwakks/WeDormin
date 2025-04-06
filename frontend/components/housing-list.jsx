"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

export function HousingList({ housing, onSelect, currentPage, totalPages, onPageChange }) {
  console.log("Housing data in list component:", housing)
  const renderPagination = () => {
    const pages = []
    const maxVisiblePages = 5

    // Always show first page
    pages.push(
      <PaginationItem key="first">
        <PaginationLink onClick={() => onPageChange(1)} isActive={currentPage === 1}>
          1
        </PaginationLink>
      </PaginationItem>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={() => onPageChange(i)} isActive={currentPage === i}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => onPageChange(totalPages)} isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      )
    }

    return pages
  }

  if (housing.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No housing options found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {housing.map((house) => (
          <Card
            key={house.housing_id}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(house)}
          >
            <div className="relative h-48 w-full">
              <Image src={house.image || "/placeholder.svg"} alt={house.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
              <Badge
                className="absolute top-2 right-2"
                variant={house.location_type === "on_campus" ? "default" : "secondary"}
              >
                {house.location_type === "on_campus" ? "On Campus" : "Off Campus"}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{house.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{house.address}</p>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-lg">{formatCurrency(house.price)}</p>
                  <p className="text-sm text-muted-foreground">
                    {house.name === "Marvin Apartments"
                      ? "per month"
                      : house.location_type === "on_campus"
                        ? "per year"
                        : "per month"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm">
                    {house.num_residents} {house.num_residents > 1 ? "residents" : "resident"}
                  </p>
                  {house.location_type === "on_campus" && house.campus && (
                    <p className="text-sm text-muted-foreground">{house.campus} Campus</p>
                  )}
                  {house.location_type === "off_campus" && house.time_to_campus && (
                    <p className="text-sm text-muted-foreground">{house.time_to_campus} min to campus</p>
                  )}
                </div>
              </div>

              {house.location_type === "on_campus" && (
                <div className="mt-2 w-full">
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-md text-center ${
                      house.chanceClassification === "high"
                        ? "bg-green-100 text-green-800"
                        : house.chanceClassification === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : house.chanceClassification === "low"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {house.chanceClassification === "high"
                      ? "High Chance"
                      : house.chanceClassification === "medium"
                        ? "Medium Chance"
                        : house.chanceClassification === "low"
                          ? "Low Chance"
                          : "Unknown Chance"}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-1 mt-0">
              <Button variant="ghost" className="w-full" onClick={() => onSelect(house)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {renderPagination()}

            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

