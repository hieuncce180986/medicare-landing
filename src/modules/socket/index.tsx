"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import SocketContent from "./main";
import { socket, WebsocketProvider } from "@/contexts/WebsocketContext";

export default function SocketClient() {
  return (
    <div
      className="relative w-full flex flex-col justify-center items-center"
      id="home"
    >
      <div className={`w-full`}>
        <Header />
      </div>
      <div className="w-full mb-0">
        <WebsocketProvider value={socket}>
          <SocketContent />
        </WebsocketProvider>
      </div>
      <Footer />
    </div>
  );
}
