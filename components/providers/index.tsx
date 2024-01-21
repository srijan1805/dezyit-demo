import StoreProvider from "./StoreProvider";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocketProvider from "./SocketProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <SocketProvider>{children}</SocketProvider>
      <ToastContainer
        position="top-center"
        theme="dark"
        autoClose={1000}
        closeOnClick
        transition={Slide}
      />
    </StoreProvider>
  );
}
