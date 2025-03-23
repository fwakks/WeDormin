"use client";

import { useRouter } from "next/navigation";
import ProfileEdit from "@/components/profile-edit";
import { useState, useEffect } from "react";

export default function Page() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const router = useRouter();
  const [oauthData, setOauthData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch OAuth data when the component mounts
  useEffect(() => {
    const fetchOAuthData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/register-student`, {
          method: "GET",
          credentials: "include", // Include cookies (e.g., JSESSIONID)
        });

        if (!response.ok) {
          throw new Error("Failed to fetch OAuth data");
        }
        const data = await response.json();
        setOauthData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchOAuthData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!oauthData) {
      setError("OAuth data not available. Please try logging in again.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // // Collect form data
    console.log(event)
    const formData = new FormData(event.target);
    // console.log(formData.get('gender'))
    var data = {
        name: oauthData.name,
        email : oauthData.email,
        oauth_id: oauthData.oauthId
    }

    // Use FormData's forEach method to iterate over the entries
    formData.forEach((value, key) => {
      if (value) {
        data[key] = value;
        // console.log(key,value)
      }
    });

    console.log(JSON.stringify(data))
    try {
      // Send POST request to create the student
      const response = await fetch(`${apiBaseUrl}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies (e.g., JSESSIONID)
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to register student");
      }

      // Redirect to dashboard after successful registration
      router.push("/dashboard");
    } catch (err) {
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
      {oauthData ? (
        <ProfileEdit
          onSubmit={handleSubmit}
          isModal={false}
          className="max-w-3xl"
        />
      ) : (
        <p>Loading OAuth data...</p>
      )}
    </div>
  );
}
