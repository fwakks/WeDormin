"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function RoommateDetail({ roommate, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

