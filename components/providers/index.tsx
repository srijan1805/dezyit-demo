"use client";

import StoreProvider from "./StoreProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "./SocketProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <SocketProvider>
        {children}
        <ProgressBar
          height="5px"
          color="#00D7C0"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <ToastContainer
          position="top-center"
          theme="dark"
          autoClose={1000}
          closeOnClick
          transition={Slide}
        />
      </SocketProvider>
    </StoreProvider>
  );
}
