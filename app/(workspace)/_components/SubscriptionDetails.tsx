import Spinner from "@/components/ui/Spinner";
import { AUTH_TOKEN, BACKEND_URL } from "@/lib/env";
import { Billing, Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { format } from "date-fns";

type Props = {
    workspace: Workspace;
};

function SubscriptionDetails({ workspace }: Props) {
    const { isPending, error, data } = useQuery<{ subscription: Billing }>({
        queryKey: [`${workspace._id}-subscription`],
        queryFn: () =>
            axios
                .get(
                    `${BACKEND_URL}/api/v1/payments/subscription/${workspace._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${AUTH_TOKEN}`,
                        },
                    }
                )
                .then((res) => res.data),
    });

    if (isPending) return <Spinner />;

    if (error) return <span>{"An error has occurred: " + error.message}</span>;

    return (
        <div className="card w-fit">
            <div className="stats bg-primary text-primary-content">
                <div className="stat">
                    <div className="inline-flex items-center space-x-2">
                        <span> Current Plan</span>
                        <span className="badge badge-lg badge-warning">
                            pro
                        </span>
                    </div>
                    <div className="stat-value">
                        ${data.subscription.amount / 100}
                    </div>
                    <div className="">per month</div>
                </div>
                <div className="stat">
                    <div className="">Current Billing cycle</div>
                    <div className="stat-value">
                        {workspace.members.length || 1} Users
                    </div>
                    <div className="">
                        {format(
                            new Date(data.subscription.startDate),
                            "do-MMM-yy"
                        )}
                        {" to "}
                        {format(
                            new Date(data.subscription.endDate),
                            "do-MMM-yy"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionDetails;
