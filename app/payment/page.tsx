"use client";

import Spinner from "@/components/ui/Spinner";
import { useAppSelector } from "@/hooks/redux";
import { BACKEND_URL } from "@/lib/env";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const COST_PER_SEAT = 9; //in dollars

type Props = {
    searchParams?: {
        workspaceId?: string;
    };
};

export default function Home({ searchParams }: Props) {
    const router = useRouter();
    const workspaceId = searchParams?.workspaceId;

    const { workspaces } = useAppSelector((state) => state.workspace);
    const workspace = workspaces.find((w) => w._id === workspaceId);

    const [seats, setSeats] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        console.log("use effect ran");
        const billableMembers = workspace?.members.filter(
            (m) => m.role !== "view"
        );

        console.log(billableMembers);
        setSeats(
            billableMembers
                ? billableMembers?.length > 0
                    ? billableMembers?.length
                    : 1
                : 1
        );
        setLoading(false);
    }, [workspaceId, workspace?._id]);

    async function handleCheckout() {
        const stripePromise = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
        );

        if (!workspaceId) {
            toast.error("Workspace ID is required");
            return;
        }

        setSubmitting(true);
        const body = {
            workspaceId,
            seats,
        };

        axios
            .post(`${BACKEND_URL}/api/v1/payments/checkout`, body, {
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
                    toast.error(
                        "Oops! Something went wrong. Please try again after some time."
                    );
                }

                setSubmitting(false);
            });
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body space-y-6">
                        <div className="card-actions justify-start">
                            <button
                                onClick={() => router.back()}
                                className="btn btn-ghost btn-sm"
                            >
                                {/* <ArrowLeftIcon className="h-5 w-5" /> */}
                                Go Back
                            </button>
                        </div>
                        <div className="badge badge-secondary badge-lg text-lg">
                            9$/Seat
                        </div>
                        <div className="flex space-x-3 items-center">
                            <p className="">Seats</p>
                            <input
                                value={seats}
                                onChange={(e) =>
                                    setSeats(Number(e.target.value))
                                }
                                type="number"
                                className="input input-bordered w-full max-w-xs"
                                disabled
                            />

                            {/* <button
                                onClick={() =>
                                    setSeats((prev) =>
                                        prev <= 1 ? prev : prev - 1
                                    )
                                }
                                className="btn btn-neutral"
                            >
                                -
                            </button>
                            <button
                                onClick={() => setSeats((prev) => prev + 1)}
                                className="btn btn-neutral"
                            >
                                +
                            </button> */}
                        </div>
                        <h2 className="card-title">
                            {seats * COST_PER_SEAT}$ / month
                        </h2>
                        <button
                            disabled={submitting}
                            onClick={() => handleCheckout()}
                            className="btn btn-outline btn-accent"
                        >
                            {submitting ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Checkout"
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
