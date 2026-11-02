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
  title: "Barbería en Las Condes | Cortes de Pelo y Barba - Level Studio",
  description: "Peluquería y barbería para hombres en Las Condes. Especialistas en cortes de pelo clásicos, modernos, degradados (fade) y perfilado de barba. Agenda tu hora aquí.",
  keywords: "barbería las condes, peluquería de hombres, corte de pelo hombre, degradado hombre, arreglo de barba las condes, barber shop santiago, peluquería masculina",
  icons: {
    icon: [
      { media: "(prefers-color-scheme: light)", url: "/logo-negro.png", href: "/logo-negro.png" },
      { media: "(prefers-color-scheme: dark)", url: "/logo-blanco.png", href: "/logo-blanco.png" },
    ],
  },
  openGraph: {
    title: "Barbería en Las Condes | Cortes de Pelo y Barba - Level Studio",
    description: "Peluquería y barbería para hombres en Las Condes. Especialistas en cortes de pelo clásicos, modernos, degradados (fade) y perfilado de barba. Agenda tu hora aquí.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["BarberShop", "HealthAndBeautyBusiness", "LocalBusiness"],
      "@id": "https://levelstudio.cl/#barbershop",
      "name": "Level Studio – Barbería en Las Condes",
      "alternateName": ["Level Studio", "Level Studio Barbería"],
      "description": "Barbería premium en Las Condes especializada en cortes de pelo para hombres, degradados (fade), diseño de barba con toalla caliente y asesoría de imagen bajo el método High Level.",
      "url": "https://levelstudio.cl",
      "telephone": "+56990118423",
      "email": "contacto@levelstudio.cl",
      "image": [
        "https://levelstudio.cl/barberia-las-condes-level-studio.webp",
        "https://levelstudio.cl/fachada-level-studio-las-condes.webp",
        "https://levelstudio.cl/experiencia-barberia-las-condes.webp"
      ],
      "logo": "https://levelstudio.cl/logo-level-studio-v2.png",
      "priceRange": "$$",
      "currenciesAccepted": "CLP",
      "paymentAccepted": "Efectivo, Tarjeta de Débito, Tarjeta de Crédito, Transferencia Bancaria",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Apoquindo 4900, Local 29",
        "addressLocality": "Las Condes",
        "addressRegion": "Región Metropolitana",
        "postalCode": "7550000",
        "addressCountry": "CL"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -33.4098,
        "longitude": -70.5732
      },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=Level+Studio+Las+Condes",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "10:00",
          "closes": "19:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "10:00",
          "closes": "15:00"
        }
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Las Condes"
        },
        {
          "@type": "City",
          "name": "Vitacura"
        },
        {
          "@type": "City",
          "name": "Providencia"
        },
        {
          "@type": "City",
          "name": "Lo Barnechea"
        },
        {
          "@type": "City",
          "name": "Santiago"
        }
      ],
      "sameAs": [
        "https://share.google/DEf3gXCVep3HQSB4S",
        "https://g.page/r/CVALOLFuHvPREBM/review",
        "https://www.instagram.com/level_studio._/",
        "https://www.tiktok.com/@level_studio",
        "https://agendafast.cl/level-studio/reservar"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5.0",
        "worstRating": "1.0",
        "ratingCount": "100",
        "reviewCount": "100"
      },
      "employee": [
        {
          "@type": "Person",
          "name": "Juanchi",
          "jobTitle": "Barbero Profesional",
          "image": "https://levelstudio.cl/barbero-juanchi-level-studio.webp",
          "knowsAbout": ["Cortes ClÃ¡sicos", "Degradados (Fade)", "DiseÃ±o de Barba", "Styling Masculino"]
        },
        {
          "@type": "Person",
          "name": "Alonso",
          "jobTitle": "Barbero Profesional",
          "image": "https://levelstudio.cl/barbero-alonso-level-studio.webp",
          "knowsAbout": ["Degradados Avanzados", "Corte Tijera", "Perfilado de Barba", "AsesorÃ­a de Imagen"]
        },
        {
          "@type": "Person",
          "name": "Misael",
          "jobTitle": "Barbero Profesional",
          "image": "https://levelstudio.cl/barbero-misael-level-studio.webp",
          "knowsAbout": ["Corte Premium", "Toalla Caliente", "Lavado y Masaje Capilar", "Cuidado Facial"]
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "@id": "https://levelstudio.cl/#catalog",
        "name": "CatÃ¡logo de Servicios de BarberÃ­a Level Studio",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corte de Cabello EstÃ¡ndar",
              "description": "Servicio integral abarcando todo tipo de tÃ©cnicas en tijeras, mÃ¡quinas y degradados (fade)."
            },
            "price": "23000",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "https://agendafast.cl/level-studio/reservar"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corte + Lavado",
              "description": "Servicio de corte de cabello clÃ¡sico o moderno acompaÃ±ado de un lavado capilar refrescante."
            },
            "price": "25000",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "https://agendafast.cl/level-studio/reservar"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corte de Cabello Premium",
              "description": "Corte + AsesorÃ­a personalizada + Lavado + ExfoliaciÃ³n capilar + masaje capilar + styling profesional."
            },
            "price": "30000",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "https://agendafast.cl/level-studio/reservar"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corte de Cabello EstÃ¡ndar + Barba Premium",
              "description": "Arreglo y perfilado de barba con toalla caliente mÃ¡s corte de cabello estÃ¡ndar."
            },
            "price": "38000",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "https://agendafast.cl/level-studio/reservar"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corte Premium + Barba Premium",
              "description": "El servicio completo para tu cabello y barba con productos de alta gama y tratamiento de toallas calientes."
            },
            "price": "43000",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "https://agendafast.cl/level-studio/reservar"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Experiencia High LEVEL",
              "description": "Corte Premium + Barba Premium + Limpieza Facial profunda + limpieza de vello. La transformaciÃ³n masculina total."
            },
            "price": "49990",
            "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "https://agendafast.cl/level-studio/reservar"
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://levelstudio.cl/#website",
      "url": "https://levelstudio.cl",
      "name": "Level Studio",
      "publisher": {
        "@id": "https://levelstudio.cl/#barbershop"
      },
      "inLanguage": "es-CL"
    },
    {
      "@type": "FAQPage",
      "@id": "https://levelstudio.cl/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Â¿DÃ³nde estÃ¡ ubicada la barberÃ­a Level Studio en Las Condes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Estamos ubicados en Av. Apoquindo 4900, Local 29, Las Condes, Santiago de Chile, a pasos del Metro Escuela Militar, con cÃ³modo acceso y estacionamientos cercanos."
          }
        },
        {
          "@type": "Question",
          "name": "Â¿CuÃ¡les son los horarios de atenciÃ³n de Level Studio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atendemos de lunes a viernes de 10:00 a 19:30 hrs y los sÃ¡bados de 10:00 a 15:00 hrs. Los domingos permanecemos cerrados."
          }
        },
        {
          "@type": "Question",
          "name": "Â¿CÃ³mo puedo agendar una hora de corte o barba?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Puedes agendar tu cita 100% online seleccionando a tu barbero de preferencia (Juanchi, Alonso o Misael) a travÃ©s de nuestro sistema de reservas en agendafast.cl/level-studio/reservar o escribiÃ©ndonos vÃ­a WhatsApp al +56 9 9011 8423."
          }
        },
        {
          "@type": "Question",
          "name": "Â¿CuÃ¡les son los precios de los servicios en Level Studio?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestros servicios van desde $23.000 para Corte EstÃ¡ndar, $25.000 Corte + Lavado, $30.000 Corte Premium con asesorÃ­a y exfoliaciÃ³n, $38.000 Corte EstÃ¡ndar + Barba Premium, $43.000 Corte Premium + Barba Premium, hasta $49.990 para la Experiencia High LEVEL completa."
          }
        },
        {
          "@type": "Question",
          "name": "Â¿QuÃ© incluye la experiencia en la barberÃ­a?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "En Level Studio brindamos una experiencia integral de confort masculino: incluye bebida o cafÃ© de cortesÃ­a, sillÃ³n de masajes, mesa de pool y un ambiente privado sin esperas innecesarias."
          }
        }
      ]
    }
  ]
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
            __html: JSON.stringify(jsonLd)
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

