import type { Metadata } from "next";
import "./resets.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "MISAAL",
  description: "A meandering speculation on Indian imagination",
  icons: {
    icon: "/assets/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
