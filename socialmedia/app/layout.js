import { Inter, Public_Sans } from "next/font/google";
import "@/styles/typography.css"
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import { ClerkProvider, SignIn } from "@clerk/nextjs";
import QueryProvider from "@/lib/QueryProvider";
 
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata = {
  title: "SocialFredy's",
  description: "All your fun and entertainment in one place",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider 
    appearance={{
      signIn:{
        variables:{colorPrimary: "#F9AA11"}
      },
      signUp:{
        variables: {colorPrimary: "#F9AA11"}
      }
    }}
    >
      <html lang="en">
        <body className={publicSans.className}>
        <QueryProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
