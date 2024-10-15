import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Script from "next/script";
import { getProfile } from "@/lib/data";

export async function generateMetadata() {
  const c = await getProfile();
  const profile = c.data.profile;

  return {
    title:
    'ProfileSuite - '+profile.name,
    description: profile.introduction,
    keywords: profile.slogan,
    
  };
}

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
