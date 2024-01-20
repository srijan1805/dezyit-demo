"use client";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const COST_PER_SEAT = 9; //in dollars

export default function Home() {
  const [seats, setSeats] = useState<number>(1);
  const router = useRouter();

  async function handleCheckout() {
    const stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );

    const body = {
      workspaceId: "hkjasdhgksdlhgk",
      seats,
    };

    axios
      .post("http://localhost:3000/api/v1/payments/checkout", body, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        if (response.status === 409) {
          router.push(response.data.redirectUrl);
        } else {
          stripePromise?.redirectToCheckout({
            sessionId: response.data.sessionId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          router.push(err.response.data.redirectUrl);
        } else {
          alert(err.response.data.msg);
        }
      });
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body space-y-6">
        <div className="badge badge-secondary badge-lg text-lg">9$/Seat</div>
        <div className="flex space-x-3 items-center">
          <p className="">Seats</p>
          <input
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            type="number"
            className="input input-bordered w-full max-w-xs"
          />

          <button
            onClick={() => setSeats((prev) => (prev <= 1 ? prev : prev - 1))}
            className="btn btn-neutral"
          >
            -
          </button>
          <button
            onClick={() => setSeats((prev) => prev + 1)}
            className="btn btn-neutral"
          >
            +
          </button>
        </div>
        <h2 className="card-title">{seats * COST_PER_SEAT} $</h2>
        <button
          onClick={() => handleCheckout()}
          className="btn btn-outline btn-accent"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
