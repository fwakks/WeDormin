"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

export function RoommateList({
  roommates,
  onSelect,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    // Always show first page
    pages.push(
      <PaginationItem key="first">
        <PaginationLink
          onClick={() => onPageChange(1)}
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show pages around current page
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i <= 1 || i >= totalPages) continue;
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => onPageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key="last">
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (roommates.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No housing options found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roommates.map((r) => (
          <Card
            key={r.ruid}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelect(r)}
          >
            <div className="relative h-48 w-full">
              <Image
                src={r.image || "/placeholder.svg"}
                alt={r.name}
                fill
                className="object-cover"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={r.major === "on_campus" ? "default" : "secondary"}
              >
                {r.major}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <h3 className="font-semibold text-lg line-clamp-1">{r.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {r.about_me}
              </p>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-lg">{r.age.toString()}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => onSelect(r)}
              >
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
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {renderPagination()}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  onPageChange(Math.min(totalPages, currentPage + 1))
                }
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
