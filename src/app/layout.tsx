import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minute Cryptic",
  description: "Quick cryptic crosswords, one a day.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-gradient-to-br from-purple-900 to-indigo-900 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
