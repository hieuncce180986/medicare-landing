"use client";

import Section1 from "./components/section-01/section-01";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export default function HomeContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const loginGG = searchParams.get("logGG");
    if (loginGG === "inactive") {
      toast({
        variant: "destructive",
        title: "Cảnh báo tài khoản",
        description: "Tài khoản đăng nhập Google đã bị vô hiệu hóa.",
      });
    }
  }, [searchParams]);
  return (
    <>
      <main className="w-full flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full py-0">
            <Section1 />
          </div>
        </div>
      </main>
    </>
  );
}
