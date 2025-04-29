import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const uidFont = localFont({
  src: "fonts/UID-SALMON-2019.ttf",
  variable: "--font-uid",
});

const iconicFont = localFont({
  src: [
    {
      path: "fonts/FC Iconic Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/FC Iconic Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/FC Iconic Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/FC Iconic Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ic",
});

const opunFont = localFont({
  src: "fonts/Opun-Thin.otf",
  variable: "--font-opun",
});

const DSFont = localFont({
  src: "fonts/DSMaltese.ttf",
  variable: "--font-ds",
});

const PGFont = localFont({
  src: "fonts/PG Vincent.ttf",
  variable: "--font-pg",
});

export const metadata = {
  title: "United TU Party",
  description: "เว็บไซต์พรรคธรรมด้วยกัน มหาวิทยาลัยธรรมศาสตร์",
  icons: {
    icon: "/favicon.ico",
    // apple: '/apple-touch-icon.png', // ถ้าต้องการ Apple Touch Icon
  },
  // manifest: '/manifest.json', // ถ้าต้องการ Web App Manifest
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${uidFont.variable} ${opunFont.variable} ${iconicFont.variable} ${DSFont.variable} ${PGFont.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
