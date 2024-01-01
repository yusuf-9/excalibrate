import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Providers
import SocketProvider from "@/providers/socket";
import StoreProvider from "@/providers/store";

// Components
import UserProvider from "@/providers/user";

const font = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Excalibrate",
  description: "A simple whiteboard with live chat and video conferencing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <StoreProvider>
          <SocketProvider>
            <UserProvider>{children}</UserProvider>
          </SocketProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
