import React, { PropsWithChildren } from "react";

type Props = {};

function layout({ children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col items-start justify-start h-full w-full space-y-6">
      {children}
    </div>
  );
}

export default layout;
