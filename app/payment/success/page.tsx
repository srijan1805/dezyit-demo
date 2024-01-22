import Link from "next/link";
import React from "react";

function PaymentSuccess() {
  return (
    <>
      <div className="text-center">
        Payment Success. Your purchase has been confirmed!
      </div>
      <Link href="/" className="btn btn-secondary">
        Okay
      </Link>
    </>
  );
}

export default PaymentSuccess;
