import type { Metadata } from "next";
// import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

// const font = Manrope({ subsets: ["latin"] });
// const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "In Ảnh Hạ Thu",
  description:
    "Chỉnh sửa ảnh miễn phí và in ảnh hạ thu dễ dàng. Tải lên những tấm ảnh yêu thích và bắt đầu chỉnh sửa ngay!",
  openGraph: {
    title: "In Ảnh Hạ Thu",
    description:
      "Chỉnh sửa ảnh hoàn toàn miễn phí và in ảnh hạ thu dễ dàng. Chọn ảnh yêu thích và tải lên để chỉnh sửa!",
    url: "https://www.inanhhathu.com/",
    images: [
      {
        url: "https://res.cloudinary.com/farmcode/image/upload/v1757376935/iatt/bg-full_hahqqi.png",
        width: 1200,
        height: 630,
        alt: "In Ảnh Hạ Thu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "In Ảnh Hạ Thu",
    description:
      "Chỉnh sửa ảnh miễn phí và in ảnh hạ thu dễ dàng. Tải lên ảnh yêu thích và chỉnh sửa ngay!",
    images: [
      "https://res.cloudinary.com/farmcode/image/upload/v1757376935/iatt/bg-full_hahqqi.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>In Ảnh Hạ Thu</title>
        <meta
          name="description"
          content="Chỉnh sửa ảnh miễn phí và in ảnh hạ thu dễ dàng. Tải lên những tấm ảnh yêu thích và bắt đầu chỉnh sửa ngay!"
        />
      </Head>
      <body
        // className={font.className}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics gaId="G-ZS4CC8H5VQ" />
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
