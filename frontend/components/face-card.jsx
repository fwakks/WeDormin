import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FaceCard() {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
          WeFittin?
        </CardTitle>
        <CardDescription>InsertNameHere</CardDescription>
        <CardAction>
          <button variant="outline">Generate</button>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex justify-center gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
        <div>Hello</div>
      </CardFooter>
    </Card>
  );
}

export default FaceCard;
