import { IconTrendingDown, IconTrendingUp, IconMapPin, IconUsers, IconBuilding, IconSchool, IconCalendar } from "@tabler/icons-react";

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
        "grid grid-cols-1 gap-6 px-4 lg:px-6 @xl/main:grid-cols-2"
      }
    >
      {cards.map((card) => (
        <Card 
          key={card.title} 
          data-slot="card"
          className={`@container/card overflow-hidden relative bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-md hover:shadow-lg transition-all ${
            interactive && card.onClick 
              ? 'cursor-pointer hover:border-primary/30 hover:scale-[1.01] hover:bg-accent/30 group' 
              : ''
          }`}
          onClick={interactive && card.onClick ? card.onClick : undefined}
        >
          {interactive && card.onClick && (
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-transparent to-primary/10 transition-opacity duration-300" />
          )}
          
          <CardHeader className="pb-0">
            <CardDescription className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
              {card.title === "Roommate" ? (
                <IconUsers className="size-4 text-primary/70" />
              ) : card.title === "Dorm" ? (
                <IconBuilding className="size-4 text-primary/70" />
              ) : (
                <IconTrendingUp className="size-4 text-primary/70" />
              )}
              {card.title}
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
          </CardHeader>

          <CardFooter className="flex-col items-start gap-1 pt-1 pb-4 text-sm border-t border-border/40">
            {card.title === "Roommate" ? (
              <>
                <div className="line-clamp-1 flex gap-2 font-medium items-center">
                  <IconSchool className="size-4 text-blue-500/70" />
                  {card.details?.major ? `${card.details.major}` : "Major..."}
                </div>
                {interactive && (
                  <Badge variant="outline" className="mt-1 group-hover:bg-primary/10 transition-colors">
                    View details
                  </Badge>
                )}
              </>
            ) : card.title === "Dorm" ? (
              <>
                <div className="line-clamp-1 flex gap-2 font-medium items-center">
                  <IconMapPin className="size-4 text-red-500/70" />
                  {card.details?.location || "Housing assignment for Spring 2025"}
                </div>
                {interactive && (
                  <Badge variant="outline" className="mt-1 group-hover:bg-primary/10 transition-colors">
                    {"View details"}
                  </Badge>
                )}
              </>
            ) : (
              // Default footer
              <>
                <div className="line-clamp-1 flex gap-2 font-medium items-center">
                  <IconTrendingUp className="size-4 text-emerald-500" />
                  Trending up this month
                </div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <IconUsers className="size-3.5 opacity-70" />
                  Visitors for the last 6 months
                </div>
              </>
            )}
          </CardFooter>
          
          {interactive && card.onClick && (
            <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-primary/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}