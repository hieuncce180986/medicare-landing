"use client";

import Section01 from "./frame/components/section-01";
import SectionHeader from "./frame/components/section-header";

export default function OrderFrameContent() {
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
