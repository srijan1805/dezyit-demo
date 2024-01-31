import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/CustomDropdown";
import { Sprint } from "@/types";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Crown } from "lucide-react";

type Props = {
    sprint: Sprint;
    className?: string;
};

function SprintCard({ sprint, className }: Props) {
    const isSprintMaster = sprint.sprintMaster === "64831dcb52328b92810508c1";
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
            {isSprintMaster && (
                <div className="bg-warning text-warning p-1 absolute left-3 top-3 rounded-full">
                    <Crown className="text-neutral" size={24} strokeWidth={2} />
                </div>
            )}
            <DropdownMenu>
                <div className="dropdown">
                    <DropdownMenuTrigger className="absolute right-2 top-2 btn btn-circle btn-ghost btn-sm">
                        <EllipsisVerticalIcon className="h-6 w-6" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Open in new tab</DropdownMenuItem>
                        {isSprintMaster && (
                            <>
                                <DropdownMenuItem>Move</DropdownMenuItem>
                                <DropdownMenuItem>Archive</DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </div>
            </DropdownMenu>

            <div className="card-body space-y-3">
                <div className="flex items-center flex-row justify-between gap-2">
                    <h2 className="card-title">{sprint.sprintName}</h2>
                    <div
                        className={`radial-progress ${
                            sprint.progress <= 25
                                ? "text-error"
                                : sprint.progress > 25 && sprint.progress <= 50
                                ? "text-warning"
                                : sprint.progress > 50 && sprint.progress < 75
                                ? "text-accent"
                                : "text-success"
                        }`}
                        // @ts-ignore: Unreachable code error
                        style={{ "--value": sprint.progress }}
                        role="progressbar"
                    >
                        {sprint.progress}%
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-2">
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
