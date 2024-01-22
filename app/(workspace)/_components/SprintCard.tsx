import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Sprint } from "@/types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    sprint: Sprint;
    className?: string;
};

function SprintCard({ sprint, className }: Props) {
    return (
        <div
            onContextMenu={() => {
                console.log("right clicked");
            }}
            className={twMerge(
                "card w-full bg-neutral text-neutral-content relative",
                className
            )}
        >
            <button className="absolute right-2 top-2 btn btn-circle btn-ghost btn-sm">
                <EllipsisVerticalIcon className="h-6 w-6" />
            </button>
            <div className="card-body space-y-3 md:space-y-0">
                <div className="flex flex-col items-center md:flex-row md:justify-between gap-2">
                    <h2 className="card-title">{sprint.sprintName}</h2>
                    <div
                        className={`radial-progress ${
                            sprint.progress <= 33
                                ? "text-error"
                                : sprint.progress > 33 && sprint.progress < 66
                                ? "text-warning"
                                : "text-success"
                        }`}
                        // @ts-ignore: Unreachable code error
                        style={{ "--value": sprint.progress }}
                        role="progressbar"
                    >
                        {sprint.progress}%
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                    <div className="avatar-group -space-x-5 rtl:space-x-reverse self-center">
                        {sprint.members.slice(0, 4).map((m) => (
                            <Avatar
                                key={m.userId}
                                className="w-12 h-12 bg-neutral"
                            >
                                <AvatarImage
                                    src={m.photoURL ?? undefined}
                                    alt={m.name}
                                />
                                <AvatarFallback>
                                    {m.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                        {sprint.members.length - 4 > 0 && (
                            <Avatar className="w-12 h-12">
                                <AvatarFallback>
                                    {`+${sprint.members.length - 4}`}
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <Link
                        href={`/sprint/${sprint._id}`}
                        className="btn btn-primary"
                    >
                        View More
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SprintCard;
