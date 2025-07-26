import "./globals.css";
import { ReduxProvider } from "@/lib/reduxProvider";
import LayoutWrapper from "../components/LayoutWrapper";
import NextAuthSession from "./NextAuthSession";

export const metadata = {
  title: "Moodmoo",
  description: "Mood-boosting milk for non-coffee lovers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pink-50 text-gray-800 font-sans flex flex-col">
        <NextAuthSession>
          <ReduxProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ReduxProvider>
        </NextAuthSession>
      </body>
    </html>
  );
}
