"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/recent");
  }, []);
  return (
    <span className="loading loading-spinner loading-lg text-primary"></span>
  );
}

export default HomePage;
