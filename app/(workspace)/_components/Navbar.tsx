"use client";
import { Bell, Menu } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar/Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import Image from "next/image";

function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    function handleClose() {
        setSidebarOpen(false);
    }
    return (
        <div className="navbar bg-base-100 pt-3 lg:px-5">
            <Sheet
                open={sidebarOpen}
                onOpenChange={(open) => setSidebarOpen(open)}
            >
                <div className="flex-1">
                    <SheetTrigger asChild>
                        <Button className="btn btn-ghost lg:hidden">
                            <Menu size={24} />
                        </Button>
                    </SheetTrigger>

                    <SheetContent
                        className="p-0 border-none bg-transparent"
                        side="left"
                    >
                        <Sidebar handleClose={handleClose} className="pt-14" />
                    </SheetContent>

                    <Link href="/" className="rounded-xl">
                        <Image
                            src="/DezyIt_GIF.gif"
                            height={36}
                            width={46}
                            alt="Dezyit"
                            objectFit="cover"
                            className="overflow-hidden object-cover rounded-xl"
                        />
                    </Link>
                </div>
                <div className="navbar-end space-x-2">
                    <Button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <Bell size={20} />
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </Button>
                    <Avatar>
                        <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                </div>
            </Sheet>
        </div>
    );
}

export default Navbar;
