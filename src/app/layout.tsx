import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/main.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eldritch Experience Database",
  description: "Database for recording eldritch artifacts, rituals, and encounters.",
};

function Header() {
  return (
    <a href="/">
    <div id="header">
      <h1>Eldritch Experience Database</h1>
    </div>
    </a>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="mainContainer">
          {<Header />}
          {children}
        </div>
      </body>
    </html>
  );
}
