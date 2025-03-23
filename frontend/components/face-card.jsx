import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function FaceCard({ size }) {
  return (
    <Card className="@container/card gap-4">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar className={`h-${size} w-${size} rounded-lg`}>
          <AvatarImage></AvatarImage>
          <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
          <CardTitle className="text-med tabular-nums">John Doe</CardTitle>
          <CardDescription>A female deer.</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-center gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">Light Sleeper</div>
        <div className="line-clamp-1 flex gap-2 font-medium">Light Sleeper</div>
        <div className="line-clamp-1 flex gap-2 font-medium">Light Sleeper</div>
      </CardFooter>
    </Card>
  );
}

export default FaceCard;
