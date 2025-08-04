// app/layout.tsx
import "./globals.css";

import { AuthProvider } from "./context/AuthContext";
import InstallPrompt from "./components/InstallPrompt";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111827" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>

      <body>
        <InstallPrompt />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
