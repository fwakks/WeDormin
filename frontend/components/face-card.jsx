"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cake, GraduationCap } from "lucide-react"
import { Badge } from "./ui/badge"
import { useState } from "react"
import { RoommateDetail } from "./roommate-detail"

function FaceCard({ size, student = { name: "John Doe", about_me: "A female deer." }, user }) {
  const [showDetail, setShowDetail] = useState(false)

  // Convert size to a specific pixel value to ensure consistency
  const avatarSize =
    size === "32" ? "w-32 h-32" : size === "24" ? "w-24 h-24" : size === "16" ? "w-16 h-16" : "w-20 h-20"

  return (
    <>
      <Card
        className="@container/card gap-4 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setShowDetail(true)}
      >
        <CardHeader className="flex flex-col items-center gap-2">
          <div className={`${avatarSize} overflow-hidden rounded-lg border-2 border-muted shadow-sm`}>
            {student.image ? (
              <img
                src={student.image || "/placeholder.svg"}
                alt={student.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-2xl">
                {student.name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <CardTitle className="text-med tabular-nums">{student.name}</CardTitle>
            <CardDescription className="text-center line-clamp-2">{student.about_me}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-center gap-3 text-sm">
          {student.age && (
            <div className="flex items-center gap-1 font-medium">
              <Cake className="h-3.5 w-3.5 text-pink-500" />
              <span>{student.age}</span>
            </div>
          )}
          {student.class_year && (
            <div className="flex items-center gap-1 font-medium">
              <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
              <span>{student.class_year}</span>
            </div>
          )}
          {student.major && (
            <Badge variant="outline" className="font-normal">
              {student.major}
            </Badge>
          )}
        </CardFooter>
      </Card>

      {showDetail && <RoommateDetail roommate={student} onClose={() => setShowDetail(false)} user={user} />}
    </>
  )
}

export default FaceCard

