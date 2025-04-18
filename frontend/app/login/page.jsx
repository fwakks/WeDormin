"use client";

import { LoginForm } from "@/components/login-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    router.push(`${baseUrl}/oauth2/authorization/google`);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <img 
              src="/wedormin.png" 
              alt="WeDormin Logo" 
              className="size-6 object-contain" 
            />
            WeDormin?
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/dorm.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}