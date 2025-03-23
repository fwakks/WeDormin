import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Cake, GraduationCap } from "lucide-react"
import { Badge } from "./ui/badge"

function FaceCard({ size, student = { name: "John Doe", about_me: "A female deer." } }) {
  return (
    <Card className="@container/card gap-4 transition-all hover:shadow-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className={`h-${size} w-${size} rounded-lg`}>
          <AvatarImage src={student.image} alt={student.name} />
          <AvatarFallback>{student.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
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
  )
}

export default FaceCard

