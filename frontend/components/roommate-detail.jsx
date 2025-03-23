"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, X } from "lucide-react";

export function RoommateDetail({ roommate, onClose }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {roommate.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={roommate.picture} alt={roommate.name} />
              <AvatarFallback>{roommate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-muted-foreground">
                {roommate.age} years old • {roommate.gender}
              </p>
              <p className="text-sm text-muted-foreground">
                {roommate.classYear} • {roommate.major}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">About Me</h3>
            <p className="text-sm text-muted-foreground">{roommate.aboutMe}</p>
          </div>
          <div>
            <h3 className="font-semibold">Likes</h3>
            <p className="text-sm text-muted-foreground">{roommate.likes}</p>
          </div>
          <div>
            <h3 className="font-semibold">Dislikes</h3>
            <p className="text-sm text-muted-foreground">{roommate.dislikes}</p>
          </div>
          <div className="flex space-x-2">
            {roommate.instagramUsername && (
              <a
                href={`https://instagram.com/${roommate.instagramUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {roommate.linkedinUsername && (
              <a
                href={`https://linkedin.com/in/${roommate.linkedinUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
