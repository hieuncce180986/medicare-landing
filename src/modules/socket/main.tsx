"use client";

import Section01 from "./components/section-01";
import SectionHeader from "./components/section-header";

export default function SocketContent() {
  return (
    <>
      <main className="w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <SectionHeader />
          <Section01 />
        </div>
      </main>
    </>
  );
}
