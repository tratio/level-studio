import type { Metadata } from "next";
import { Inter, Playfair_Display, Gloock, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import SmoothScroll from "@/components/SmoothScroll";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const gloock = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gloock",
});

const nothing = Nothing_You_Could_Do({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nothing",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://levelstudio.cl"),
  title: "Level Studio | Barbería Premium en Las Condes",
  description: "Level Studio es la barbería más exclusiva de Las Condes. Ofrecemos cortes de pelo premium, arreglo de barba y método High Level. Reserva tu cita online.",
  keywords: "barbería Las Condes, corte de pelo hombre, barbería premium Santiago, arreglo de barba, Level Studio",
  openGraph: {
    title: "Level Studio | Barbería Premium en Las Condes",
    description: "Experiencia de barbería diseñada para clientes modernos y exigentes. Método HIGH LEVEL para un look consistente.",
    url: "https://levelstudio.cl",
    siteName: "Level Studio",
    images: [
      {
        url: "/barberia-las-condes-level-studio.webp",
        width: 1200,
        height: 630,
        alt: "Interior de Level Studio en Las Condes",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${gloock.variable} ${nothing.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Level Studio",
                "image": "https://levelstudio.cl/barberia-las-condes-level-studio.webp",
                "description": "Level Studio es una barbería premium ubicada en Las Condes, especializada en cortes de pelo para hombres y arreglo de barba con el método High Level.",
                "url": "https://levelstudio.cl",
                "telephone": "+56990118423",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Av. Apoquindo 4900, Local 29",
                  "addressLocality": "Las Condes",
                  "addressRegion": "Región Metropolitana",
                  "addressCountry": "CL"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": -33.4098,
                  "longitude": -70.5732
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "10:00",
                    "closes": "19:30"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Saturday",
                    "opens": "10:00",
                    "closes": "15:00"
                  }
                ],
                "priceRange": "$$$"
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "¿Dónde está ubicada la barbería Level Studio?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Estamos ubicados en Av. Apoquindo 4900, Local 29, Las Condes, Región Metropolitana."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "¿Cuáles son los precios de los cortes de pelo en Level Studio?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Ofrecemos diferentes niveles de servicio. El Corte Estándar tiene un valor de $22.000, Corte + Lavado por $25.000, y la Experiencia High Level (Corte Premium, Barba Premium, Limpieza Facial) por $49.990."
                    }
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-white min-h-screen selection:bg-red-900 selection:text-white antialiased">
        <SmoothScroll>
          {children}
          <WhatsAppButton />
        </SmoothScroll>
        <GoogleAnalytics gaId="G-295ZPHC7JF" />
      </body>
    </html>
  );
}
