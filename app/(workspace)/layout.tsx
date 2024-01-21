import React, { PropsWithChildren } from "react";
import Sidebar from "./_components/Sidebar";
import Navbar from "./_components/Navbar";

type Props = {};

function layout({ children }: PropsWithChildren<Props>) {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex gap-3 h-full">
        <Sidebar />
        <div className="p-4 w-full md:p-10 flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;