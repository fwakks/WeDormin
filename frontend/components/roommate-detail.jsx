"use client"
import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Instagram,
  Linkedin,
  X,
  Cake,
  GraduationCap,
  User,
  MapPin,
  Heart,
  ThumbsDown,
  MessageCircle,
  Mail,
  Check,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function RoommateDetail({ roommate, onClose, user }) {
  const [isSelecting, setIsSelecting] = useState(false)
  const [hasSelected, setHasSelected] = useState(false)

  const selectRoommate = async () => {
    if (!user?.ruid) {
      console.error("User not logged in or RUID not available")
      return
    }
  
    console.log("Selecting roommate:", roommate.ruid, "User ID:", user.ruid)
    setIsSelecting(true)
    
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
      console.log("Making PATCH request to:", `${apiBaseUrl}/api/students/${user.ruid}`)
      
      const response = await fetch(`${apiBaseUrl}/api/students/${user.ruid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          chosen_student_id: parseInt(roommate.ruid)
        })
      })
  
      console.log("Response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Error response:", errorText)
        throw new Error(`Failed to select roommate: ${response.status} ${errorText}`)
      }
  
      const data = await response.json()
      console.log("Successfully selected roommate:", data)
      setHasSelected(true)
    } catch (error) {
      console.error("Error selecting roommate:", error)
    } finally {
      if (!hasSelected) {
        setIsSelecting(false)
      }
    }
  }

  return (
    <Dialog open={!!roommate} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto rounded-lg">
        <div className="relative h-40 w-full bg-gradient-to-r from-primary/20 to-primary/10">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 bg-background/80 hover:bg-background/90 z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="absolute -bottom-16 left-6">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={roommate.picture} alt={roommate.name} />
              <AvatarFallback className="text-3xl">{roommate.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <DialogHeader className="pt-20 px-6">
          <DialogTitle className="text-2xl font-bold">{roommate.name}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Cake className="h-3.5 w-3.5 text-pink-500" />
              {roommate.age} years old
            </Badge>

            {roommate.gender && (
              <Badge variant="outline" className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-purple-500" />
                {roommate.gender}
              </Badge>
            )}

            {roommate.classYear && (
              <Badge variant="outline" className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                {roommate.classYear}
              </Badge>
            )}

            {roommate.major && (
              <Badge variant="outline" className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                {roommate.major}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          <div>
            <h3 className="font-semibold flex items-center text-base mb-2">
              <MessageCircle className="h-4 w-4 mr-2 text-primary" />
              About Me
            </h3>
            <p className="text-sm text-muted-foreground">{roommate.about_me}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold flex items-center text-base mb-2">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              Likes
            </h3>
            <p className="text-sm text-muted-foreground">{roommate.likes}</p>
          </div>

          <div>
            <h3 className="font-semibold flex items-center text-base mb-2">
              <ThumbsDown className="h-4 w-4 mr-2 text-orange-500" />
              Dislikes
            </h3>
            <p className="text-sm text-muted-foreground">{roommate.dislikes}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-base mb-3">Connect</h3>
            <div className="flex space-x-3">
              {roommate.instagram_username && (
                <a
                  href={`https://instagram.com/${roommate.instagram_username.startsWith('@') ? roommate.instagram_username.slice(1) : roommate.instagram_username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Instagram className="h-4 w-4 text-pink-600" />
                  </Button>
                </a>
              )}

              {roommate.linkedin_link && (
                <a
                  href={`${roommate.linkedin_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                  </Button>
                </a>
              )}

              {roommate.email && (
                <a
                  href={`mailto:${roommate.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <DialogFooter className="px-6 py-4">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Close
          </Button>
          <Button
            onClick={selectRoommate}
            disabled={isSelecting || hasSelected || !user?.ruid || user?.ruid === roommate.ruid}
          >
            {isSelecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Selecting...
              </>
            ) : hasSelected ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Selected as Roommate
              </>
            ) : (
              "Select as Roommate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}