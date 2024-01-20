import Link from "next/link";
import React from "react";

function PaymentFailed() {
  return (
    <>
      <div>Payment Cancelled</div>
      <Link href={"/"} className="link link-accent">
        Go back to Home
      </Link>
    </>
  );
}

export default PaymentFailed;
