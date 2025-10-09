"use client";

import { WebsocketProvider, socket } from "@/contexts/WebsocketContext";
import SocketClient from "@/modules/socket";
import React, { Suspense } from "react";

export default function OrderPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Suspense fallback={<div></div>}>
        <SocketClient />
      </Suspense>
    </div>
  );
}
