import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ProfileEdit({ onSubmit }) {
  const profile = [
    {
      id: "age",
      required: true,
    },
    {
      id: "gender",
      required: true,
    },
    {
      id: "class_year",
      required: true,
    },
    {
      id: "major",
      required: true,
    },
    {
      id: "about_me",
      required: true,
    },
    {
      id: "likes",
      required: true,
    },
    {
      id: "dislikes",
      required: true,
    },
    {
      id: "instagram_username",
      required: false,
    },
    {
      id: "linkedin_link",
      required: false,
    },
    {
      id: "housing_preference",
      required: false,
    },
    {
      id: "lottery_number",
      required: false,
    },
    {
      id: "seniority_points",
      required: false,
    },
    {
      id: "image",
      required: false,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col xs:max-w-[425px] md:max-w-[625px] h-[625px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px] overflow-y-auto rounded-md">
            <div className="grid gap-4 py-4">
              {profile.map((field) => (
                <div className="grid gap-2" key={field.id}>
                  <Label htmlFor={field.id}>{field.id}</Label>
                  <Input id={field.id} type="text" placeholder="yessir" />
                </div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEdit;
