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

function AiCard({ cards }) {
  const card = cards[0];
  return (
    <Card key={card.title} className="@container/card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          WeFittin?
        </CardTitle>
        <CardDescription>people WeThinkin you might like</CardDescription>
        <CardAction>
          <Badge variant="outline">
            <IconTrendingUp />
            Generate
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex flex-row gap-1.5 text-sm">
        <div className="flex-grow">
          <FaceCard size={32} />
        </div>
        <div className="flex-grow">
          <FaceCard size={32} />
        </div>
        <div className="flex-grow">
          <FaceCard size={32} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default AiCard;
