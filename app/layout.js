import { Toaster } from "react-hot-toast";
import { AdminProvider } from "@/context/AdminContext";
import "./globals.css";

export const metadata = {
  title: "Manuprints — Premium Printing & Branding in Nairobi",
  description: "Custom printed apparel, 3D signages, corporate branding and screen printing across Kenya.",
  keywords: "printing nairobi, branding kenya, custom t-shirts, screen printing, 3D signage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AdminProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "rgba(255,255,255,0.95)",
                color: "#2C1810",
                border: "1px solid rgba(139,105,20,0.3)",
                fontFamily: "'Outfit', sans-serif",
              },
            }}
          />
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}