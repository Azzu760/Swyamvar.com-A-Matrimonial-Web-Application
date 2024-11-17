"use client";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Notifications from "../../components/Notifications";

function NotificationsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    if (router.query && router.query.userId) {
      setUserId(router.query.userId);
      setLoading(false);
    }
  }, [router.query]);

  if (loading) {
    return <div className="mt-16 p-4">Loading...</div>;
  }

  if (!userId) {
    return <div className="mt-16 p-4 text-red-500">User ID is missing.</div>;
  }

  return (
    <div className="mt-16 p-4">
      <nav className="fixed top-0 left-0 w-full bg-dark-gray py-4 pl-6 flex items-center text-white text-lg font-semibold z-10">
        <button
          onClick={handleBack}
          className="flex items-center justify-center p-2 mr-2"
        >
          <FaArrowLeft className="text-white" />
        </button>
        <span className="flex-grow text-center">Notifications</span>
      </nav>
      <Notifications userId={userId} />
    </div>
  );
}

export default NotificationsPage;
