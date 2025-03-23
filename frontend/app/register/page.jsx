"use client";

import { useRouter } from "next/navigation";
import ProfileEdit from "@/components/profile-edit";

export default function Page() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      {/* Pass a custom width class to ProfileEdit */}
      <ProfileEdit onSubmit={handleSubmit} isModal={false} className="max-w-3xl" />
    </div>
  );
}
