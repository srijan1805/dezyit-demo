"use client";

import StoreProvider from "./StoreProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "./SocketProvider";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <SocketProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
                <ProgressBar
                    height="5px"
                    color="#00D7C0"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
                <ToastContainer
                    position="bottom-right"
                    theme="dark"
                    autoClose={1000}
                    closeOnClick
                    transition={Slide}
                />
            </SocketProvider>
        </StoreProvider>
    );
}
