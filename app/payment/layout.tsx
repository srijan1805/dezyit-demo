import React from "react";

type Props = {};

function PaymentsLayout({ children }: React.PropsWithChildren<Props>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center mx-auto space-y-4">
      {children}
    </div>
  );
}

export default PaymentsLayout;
