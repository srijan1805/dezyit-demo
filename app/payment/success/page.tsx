import Link from "next/link";
import React from "react";

function PaymentSuccess() {
    return (
        <>
            <div className="text-center">
                Payment Success. Your purchase has been confirmed!
            </div>
            <Link replace href="/" className="btn btn-secondary">
                Back to Dashboard
            </Link>
        </>
    );
}

export default PaymentSuccess;
