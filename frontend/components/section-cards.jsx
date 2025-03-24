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

export function SectionCards({ cards, width }) {
  return (
    <div
      className={
        "*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2"
      }
    >
      {cards.map((card) => (
        <Card key={card.title} className="@container/card">
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
                  Contact information available
                </div>
                <div className="text-muted-foreground">
                  Click for more details
                </div>
              </>
            ) : card.title === "Dorm" ? (
              <>
                <div className="line-clamp-1 flex gap-2 font-medium">
                  Housing assignment for Spring 2025
                </div>
                <div className="text-muted-foreground">
                  View building information
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
