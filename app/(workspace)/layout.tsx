import React, { PropsWithChildren } from "react";
import Sidebar from "./_components/Sidebar/Sidebar";
import Navbar from "./_components/Navbar";

type Props = {};

function WorkSpaceLayout({ children }: PropsWithChildren<Props>) {
    return (
        <div className="h-screen overflow-hidden">
            <Navbar />
            <div className="flex gap-3 h-full">
                <Sidebar className="hidden lg:block" />
                <div className="p-4 w-full md:p-10 flex flex-col items-center justify-center overflow-y-scroll h-[calc(100vh-88px)] scrollbar-thin">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default WorkSpaceLayout;
