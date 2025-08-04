import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FREELive",
  description: "travel destination discovery app",
  icons:{
    icon:"/fav.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
