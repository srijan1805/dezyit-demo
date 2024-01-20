"use client";

import manageSubscription from "@/lib/manageSubscription";
import { useRouter } from "next/navigation";
import React from "react";

function PaymentSuccess() {
  const router = useRouter();

  async function handleClick() {
    const { error, url } = await manageSubscription();

    if (error) {
      alert(error);
      return;
    }

    if (url) {
      router.push(url);
    }
  }
  return (
    <>
      <div className="text-center">
        Payment Success. Your purchase has been confirmed!{" "}
      </div>
      <button onClick={() => handleClick()} className="btn btn-secondary">
        Manage Subscription
      </button>
    </>
  );
}

export default PaymentSuccess;
