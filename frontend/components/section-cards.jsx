import { IconTrendingDown, IconTrendingUp, IconMapPin, IconUsers, IconBuilding } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({ cards, width, interactive = false }) {
  return (
    <div
      className={
        "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2"
      }
    >
      {cards.map((card) => (
        <Card 
          key={card.title} 
          className={`@container/card ${interactive && card.onClick ? 'cursor-pointer hover:bg-accent/50 transition-colors' : ''}`}
          onClick={interactive && card.onClick ? card.onClick : undefined}
        >
          <CardHeader>
            <CardDescription>{card.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            {card.title === "Roommate" ? (
              <>
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.details?.major ? `${card.details.major}` : "Contact information available"}
                </div>
                <div className="line-clamp-1 flex gap-2 text-muted-foreground">
                  {card.details?.classYear ? card.details.classYear : ""}
                </div>
                <div className="text-muted-foreground">
                  {interactive ? "Click for more details" : ""}
                </div>
              </>
            ) : card.title === "Dorm" ? (
              <>
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <IconMapPin className="size-4" />
                  {card.details?.location || "Housing assignment for Spring 2025"}
                </div>
                {card.details?.type && (
                  <div className="line-clamp-1 flex gap-2 text-muted-foreground">
                    <IconBuilding className="size-4" />
                    {card.details.type} {card.details.capacity && `· Capacity: ${card.details.capacity}`}
                  </div>
                )}
                <div className="text-muted-foreground">
                  {card.details?.term || "View building information"}
                </div>
              </>
            ) : (
              // Default footer
              <>
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Trending up this month <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Visitors for the last 6 months
                </div>
              </>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
