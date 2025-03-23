import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FaceCard from "./face-card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function AiCard() {
  const [chosen, setChosen] = useState([]);

  const handleClick = async () => {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

      const response = await fetch(`${apiBaseUrl}/api/user`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();

      const generation = await fetch(
        `${apiBaseUrl}/api/students/${userData.ruid}/similar/3`,
        {
          // /{id}/similar/{limit}
          credentials: "include",
        }
      );

      if (!generation.ok) {
        throw new Error("Failed to fetch similar students");
      }

      const genData = await generation.json();
      console.log(genData);
      setChosen(genData);
    } catch (error) {
      console.error("Error fetching AI data:", error);
    }
  };

  return (
    <Card key="AiCard" className="@container/card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          WeFittin?
        </CardTitle>
        <CardDescription>people WeThinkin you might like</CardDescription>
        <CardAction>
          <Button onClick={handleClick}>
            <Badge variant="outline">
              <IconTrendingUp />
              Generate
            </Badge>
          </Button>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex flex-row gap-1.5 text-sm">
        <div className="flex-grow">
          {chosen[0] ? (
            <FaceCard size={32} student={chosen[0]} />
          ) : (
            <FaceCard size={32} />
          )}
        </div>
        <div className="flex-grow">
          {chosen[1] ? (
            <FaceCard size={32} student={chosen[1]} />
          ) : (
            <FaceCard size={32} />
          )}
        </div>
        <div className="flex-grow">
          {chosen[2] ? (
            <FaceCard size={32} student={chosen[2]} />
          ) : (
            <FaceCard size={32} />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

export default AiCard;
