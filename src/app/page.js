"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default function App() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const expiryDate = localStorage.getItem("expiryDate");

    if (savedUserId && expiryDate && new Date() < new Date(expiryDate)) {
      // Valid session, redirect to dashboard
      router.push(`/dashboard/${savedUserId}`);
    } else {
      // Invalid or expired session, redirect to home
      localStorage.removeItem("userId");
      localStorage.removeItem("expiryDate");
      router.push("/home");
    }

    // Ensure loading remains until redirection is complete
    const timeout = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timeout);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return null;
}
