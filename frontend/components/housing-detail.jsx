"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import {
  Building,
  Users,
  Home,
  MapPin,
  Clock,
  Check,
  X,
  Wifi,
  Utensils,
  Droplets,
  Thermometer,
  Shirt,
} from "lucide-react"
import Image from "next/image"

export function HousingDetail({ housing, onClose }) {
  const amenitiesList = housing.amenities.split(",").map((item) => item.trim())

  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase()

    if (lowerAmenity.includes("wifi")) return <Wifi className="h-4 w-4" />
    if (lowerAmenity.includes("laundry")) return <Shirt className="h-4 w-4" />
    if (lowerAmenity.includes("kitchen") || lowerAmenity.includes("dishwasher")) return <Utensils className="h-4 w-4" />
    if (lowerAmenity.includes("air") || lowerAmenity.includes("heat")) return <Thermometer className="h-4 w-4" />
    if (lowerAmenity.includes("water") || lowerAmenity.includes("bath")) return <Droplets className="h-4 w-4" />

    return <Check className="h-4 w-4" />
  }

  return (
    <Dialog open={!!housing} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{housing.name}</DialogTitle>
              <DialogDescription className="text-base mt-1">{housing.address}</DialogDescription>
            </div>
            <Badge variant={housing.location_type === "on_campus" ? "default" : "secondary"}>
              {housing.location_type === "on_campus" ? "On Campus" : "Off Campus"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="relative h-64 w-full my-4 rounded-md overflow-hidden">
          <Image src={housing.image || "/placeholder.svg"} alt={housing.name} fill className="object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>
                  {housing.location_type === "on_campus"
                    ? `${housing.housing_type || "Housing"} - ${housing.campus} Campus`
                    : "Off-Campus Housing"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {housing.num_residents} {housing.num_residents > 1 ? "residents" : "resident"}
                </span>
              </div>
              {housing.num_rooms && (
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {housing.num_rooms} {housing.num_rooms > 1 ? "rooms" : "room"}
                  </span>
                </div>
              )}
              {housing.sq_ft && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{housing.sq_ft} sq ft</span>
                </div>
              )}
              {housing.time_to_campus && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{housing.time_to_campus} minutes to campus</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {housing.availability ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Available</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Not Available</span>
                  </>
                )}
              </div>
            </div>

            {housing.min_class_year && (
              <div className="mt-4">
                <h4 className="font-medium mb-1">Eligibility</h4>
                <p>{housing.min_class_year} and above</p>
              </div>
            )}

            {housing.avg_lottery_number && (
              <div className="mt-4">
                <h4 className="font-medium mb-1">Average Lottery Number</h4>
                <p>{housing.avg_lottery_number}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-2xl font-bold">{formatCurrency(housing.price)}</div>
              <div className="text-sm text-muted-foreground">
                {housing.location_type === "on_campus" ? "per semester" : "per month"}
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {amenitiesList.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Apply for Housing</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

