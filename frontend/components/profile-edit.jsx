import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ProfileEdit({ onSubmit, isModal = false, userData = {} }) {
  const profile = [
    { id: "age", required: true },
    { id: "gender", required: true },
    { id: "class_year", required: true },
    { id: "major", required: true },
    { id: "about_me", required: true },
    { id: "likes", required: true },
    { id: "dislikes", required: true },
    { id: "instagram_username", required: false },
    { id: "linkedin_link", required: false },
    { id: "housing_preference", required: false },
    { id: "lottery_number", required: false },
    { id: "seniority_points", required: false },
    { id: "image", required: false },
  ];

  const renderForm = (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Profile</h1>
      <form onSubmit={onSubmit} className="w-3xl max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <ScrollArea className="h-800px] overflow-y-auto rounded-md">
          <div className="grid gap-4 py-4">
            {profile.map((field) => (
              <div className="grid gap-2" key={field.id}>
                <Label htmlFor={field.id}>
                {field.id.replace('_', ' ').charAt(0).toUpperCase() + field.id.replace('_', ' ').slice(1)} {field.required && <span style={{ color: 'red' }}>*</span>}
                </Label>
                <Input 
                  id={field.id} 
                  type="text" 
                  placeholder="Enter here..."
                  required={field.required}
                  name={field.id}
                  defaultValue={userData[field.id] || ''}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );

  if (isModal) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>

        <DialogContent className="flex flex-col xs:max-w-[425px] md:max-w-[625px] h-[625px]">
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px] overflow-y-auto rounded-md">
              <div className="grid gap-4 py-4">
                {profile.map((field) => (
                  <div className="grid gap-2" key={field.id}>
                    <Label htmlFor={field.id}>
                    {field.id.replace('_', ' ').charAt(0).toUpperCase() + field.id.replace('_', ' ').slice(1)} {field.required && <span style={{ color: 'red' }}>*</span>}
                    </Label>
                    <Input 
                      id={field.id} 
                      type="text" 
                      placeholder="Enter here..." 
                      required={field.required}
                      name={field.id}
                      defaultValue={userData[field.id] || ''}
                    />
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

  return renderForm;
}

export default ProfileEdit;