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
  title: "Medicare",
  description: "Medicare",
  openGraph: {
    title: "Medicare",
    description: "Medicare",
    url: "https://www.inanhhathu.com/",
    images: [
      {
        url: "https://res.cloudinary.com/farmcode/image/upload/v1757376935/iatt/bg-full_hahqqi.png",
        width: 1200,
        height: 630,
        alt: "Medicare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medicare",
    description: "Medicare",
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
        <title>Medicare</title>
        <meta name="description" content="Medicare" />
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
