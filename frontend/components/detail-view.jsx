"use client"

import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconSchool,
  IconMapPin,
  IconCoin,
  IconHome,
  IconUser,
  IconUsers,
  IconCalendar,
  IconCake
} from "@tabler/icons-react"
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

/**
 * Unified DetailView component that handles both roommate and housing details
 * @param {Object} props - Component props
 * @param {Object} props.data - The data object containing details to display
 * @param {"roommate"|"housing"} props.type - The type of detail to display
 * @param {Function} props.onClose - Function to call when closing the detail view
 */
export function DetailView({ data, type, onClose }) {
  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Format roommate data
  const getRoommateDetails = () => {
    if (!data) return {}
    
    return {
      name: data.name || "Unknown",
      major: data.major || "Not specified",
      class_year: data.class_year || "Not specified",
      email: data.email || null,
      instagram: data.instagram_username || null,
      linkedin: data.linkedin_link || null,
      bio: data.about_me || null,
      likes: data.likes || null,
      dislikes: data.dislikes || null,
      avatar: data.picture || null,
      age: data.age || null,
      gender: data.gender || null
    }
  }

  // Format housing data
  const getHousingDetails = () => {
    if (!data) return {}
    
    return {
      name: data.name || "Unknown",
      address: data.address || "Not specified",
      price: data.price || "N/A",
      type: data.housing_type || "Not specified",
      locationType: data.location_type === "on_campus" ? "On Campus" : "Off Campus",
      capacity: data.max_residents || null,
      description: data.description || null,
      amenities: data.amenities ? data.amenities.split(",").map(a => a.trim()) : [],
      image: data.image || null,
      numRooms: data.num_rooms || null,
      numResidents: data.num_residents || null,
      campusLocation: data.campus || null,
      availability: data.availability !== undefined ? data.availability : null
    }
  }

  const details = type === "roommate" ? getRoommateDetails() : getHousingDetails()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{details.name} - {type === "roommate" ? "Roommate Details" : "Housing Details"}</DialogTitle>
        </DialogHeader>
        <Card className="w-full border-0 shadow-none">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{details.name}</CardTitle>
              <CardDescription>{type === "roommate" ? "Roommate Details" : "Housing Details"}</CardDescription>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            {type === "roommate" ? (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={details.avatar} alt={details.name} />
                    <AvatarFallback className="text-2xl">{getInitials(details.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    {details.instagram && (
                      <Link
                        href={`https://instagram.com/${details.instagram.startsWith('@') ? details.instagram.slice(1) : details.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="icon" aria-label="Instagram">
                          <IconBrandInstagram className="h-4 w-4 text-pink-600" />
                        </Button>
                      </Link>
                    )}
                    {details.linkedin && (
                      <Link href={details.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" aria-label="LinkedIn">
                          <IconBrandLinkedin className="h-4 w-4 text-blue-600" />
                        </Button>
                      </Link>
                    )}
                    {details.email && (
                      <Link href={`mailto:${details.email}`}>
                        <Button variant="outline" size="icon" aria-label="Email">
                          <IconMail className="h-4 w-4 text-blue-400" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Major</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <IconSchool className="h-4 w-4 text-blue-500" />
                        {details.major}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Class Year</h3>
                      <p className="mt-1 flex items-center gap-2">
                        <IconCalendar className="h-4 w-4 text-green-500" />
                        {details.class_year}
                      </p>
                    </div>
                    {details.age && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Age</h3>
                        <p className="flex items-center gap-2 mt-1">
                          <IconCake className="h-4 w-4 text-pink-500" />
                          {details.age} years old
                        </p>
                      </div>
                    )}
                    {details.gender && (
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Gender</h3>
                        <p className="flex items-center gap-2 mt-1">
                          <IconUser className="h-4 w-4 text-purple-500" />
                          {details.gender}
                        </p>
                      </div>
                    )}
                  </div>

                  {details.bio && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">About</h3>
                      <p className="mt-1">{details.bio}</p>
                    </div>
                  )}
                  
                  {details.likes && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Likes</h3>
                      <p className="mt-1">{details.likes}</p>
                    </div>
                  )}
                  
                  {details.dislikes && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Dislikes</h3>
                      <p className="mt-1">{details.dislikes}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <IconMapPin className="h-4 w-4" />
                      {details.address}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <IconCoin className="h-4 w-4" />
                      ${details.price} {details.locationType === "On Campus" ? "per semester" : "per month"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Number of Residents</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <IconUsers className="h-4 w-4" />
                      {details.numResidents}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Location Type</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <IconHome className="h-4 w-4" />
                      {details.locationType}
                    </p>
                  </div>
                  
                  {details.capacity && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Capacity</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <IconUsers className="h-4 w-4" />
                        {details.capacity} residents
                      </p>
                    </div>
                  )}
                  
                  {details.numRooms && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Number of Rooms</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <IconHome className="h-4 w-4" />
                        {details.numRooms}
                      </p>
                    </div>
                  )}
                  
                  {details.campusLocation && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Campus</h3>
                      <p className="flex items-center gap-2 mt-1">
                        <IconMapPin className="h-4 w-4" />
                        {details.campusLocation} Campus
                      </p>
                    </div>
                  )}
                </div>
                
                {details.amenities && details.amenities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {details.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {details.description && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                    <p className="mt-1">{details.description}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  )
}

// TODO update section cards ui
// TODO logout