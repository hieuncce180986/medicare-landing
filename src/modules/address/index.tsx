"use client";

import Header from "@/layout/header";
import Footer from "@/layout/footer";
import OrderFrameContent from "./main";

export default function OrderClient() {
  return (
    <div
      className="relative w-full flex flex-col justify-center items-center"
      id="home"
    >
      <div className={`w-full`}>
        <Header />
      </div>
      <div className="w-full mb-0">
        <OrderFrameContent />
      </div>
      <Footer />
    </div>
  );
}
