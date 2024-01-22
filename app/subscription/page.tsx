"use client";
import { useRouter } from "next/navigation";
import React from "react";

function ManageSubscription() {
    const router = useRouter();

    async function handleClick() {
        // const { error, url } = await manageSubscription();
        // if (error) {
        //   alert(error);
        //   return;
        // }
        // if (url) {
        //   router.push(url);
        // }
    }
    return (
        <div>
            <button onClick={() => handleClick()} className="btn btn-secondary">
                Manage Subscription
            </button>
        </div>
    );
}

export default ManageSubscription;
