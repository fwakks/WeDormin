"use client";

import { useRouter } from "next/navigation";
import ProfileEdit from "@/components/profile-edit";
import { useState, useEffect } from "react";

export default function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const registerAndFetchUser = async () => {
      try {
        // First, hit the register endpoint to create the user in the database
        const registerResponse = await fetch(`${apiBaseUrl}/register`, {
          method: "GET",
          credentials: "include",
        });

        if (!registerResponse.ok) {
          console.log("Registration response:", registerResponse.status);
        }
        
        // Then fetch the user data
        const userResponse = await fetch(`${apiBaseUrl}/api/user`, {
          method: "GET",
          credentials: "include",
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        
        const data = await userResponse.json();
        console.log("User data fetched:", data);
        setUserData(data);
      } catch (err) {
        console.error("Error in registration flow:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    registerAndFetchUser();
  }, [apiBaseUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userData) {
      setError("User data not available. Please try logging in again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Collect form data
    const formData = new FormData(event.target);
    const updates = {};

    formData.forEach((value, key) => {
      if (value) {
        // Convert numeric string values to numbers where needed
        if (key === "lottery_number" || key === "seniority_points" || key === "age") {
          updates[key] = Number(value);
        } else {
          updates[key] = value;
        }
      }
    });

    console.log("Updating user with data:", JSON.stringify(updates));
    
    try {
      // Send PATCH request to update the student
      const response = await fetch(`${apiBaseUrl}/api/students/${userData.ruid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update profile: ${errorText}`);
      }

      // Redirect to dashboard after successful update
      router.push("/dashboard");
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8">
      <h1 className="text-3xl font-semibold mb-6">Complete Your Profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading && <p>Loading...</p>}
      {userData ? (
        <ProfileEdit
          onSubmit={handleSubmit}
          isModal={false}
          className="max-w-3xl"
          userData={userData}
        />
      ) : (
        !isLoading && <p>Unable to load user data. Please try logging in again.</p>
      )}
    </div>
  );
}