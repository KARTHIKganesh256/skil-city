import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { RaindropAnimation } from "@/components/RaindropAnimation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SilkCity - Dharmavaram Saree Store | Authentic Indian Sarees",
  description: "Discover the finest collection of authentic Indian sarees from Dharmavaram and across India. Premium silk sarees, custom designs, and traditional craftsmanship.",
  keywords: ["sarees", "silk sarees", "Dharmavaram", "Indian sarees", "wedding sarees", "traditional wear"],
  authors: [{ name: "SilkCity" }],
  openGraph: {
    title: "SilkCity - Dharmavaram Saree Store",
    description: "Authentic Indian sarees from Dharmavaram and beyond",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <RaindropAnimation />
        <CartProvider>
          <FavoritesProvider>
            <Navigation cartCount={0} />
            {children}
            <Footer />
            <Toaster />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
