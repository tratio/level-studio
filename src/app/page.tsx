"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle, UserCheck } from "lucide-react";
import { sendGAEvent } from '@next/third-parties/google';

// --- CONSTANTES DE DATOS (CLEAN CODE) ---
const AGENDA_URL = "https://agendafast.cl/level-studio/reservar";

const SERVICES = [
  { name: "Corte de Cabello Estándar", price: "$23.000", desc: "Servicio integral abarcando todo tipo de técnicas en tijeras, máquinas y degradados (fade)." },
  { name: "Corte + Lavado", price: "$25.000", desc: "Servicio de corte de cabello clásico o moderno acompañado de un lavado capilar." },
  { name: "Corte de Cabello Premium", price: "$30.000", desc: "Corte + Asesoría + Lavado + Exfoliación capilar + masaje capilar + styling (peinado)." },
  { name: "Corte de Cabello Estandar + Barba Premium", price: "$38.000", desc: "Arreglo de barba con toalla caliente más corte de cabello estándar." },
  { name: "Corte Premium + Barba Premium", price: "$43.000", desc: "El servicio completo para tu cabello y barba con productos de alta gama y toallas calientes." },
  { name: "Experiencia High LEVEL", price: "$49.990", desc: "Corte Premium + Barba Premium + Limpieza Facial + limpieza de vello. La transformación total." }
];

const EXPERIENCE_FEATURES = [
  { icon: MapPin, title: "Ubicación Exclusiva", desc: "En el corazón de las condes, disfruta de tu momento de cuidado masculino con nuestro sillón de masajes, mesa de Pool y bebida de cortesía." },
  { icon: CheckCircle, title: "Método HIGH LEVEL", desc: "Logramos un look consistente y de alto nivel. Definimos tu estilo y lo ejecutamos a la perfección." },
  { icon: UserCheck, title: "Cero Fricción", desc: "Ideal para hombres profesionales. Obtén resultados impecables sin tener que explicar lo mismo en cada visita." }
];

const BARBERS = [
  { name: "Juanchi", role: "Barbero Profesional", img: "/barbero-juanchi-level-studio.webp", url: "https://agendafast.cl/level-studio/reservar?profesional=827f1652-4bb1-48fd-b60a-1e794f24ae53" },
  { name: "Alonso", role: "Barbero Profesional", img: "/barbero-alonso-level-studio.webp", url: "https://agendafast.cl/level-studio/reservar?profesional=ba8d4d1c-4c36-46e5-a542-702dabd0a115" },
  { name: "Misael", role: "Barbero Profesional", img: "/barbero-misael-level-studio.webp", url: "https://agendafast.cl/level-studio/reservar?profesional=576fd829-2fe4-4a37-924c-60a22aa5d14f" }
];

const REVIEWS = [
  { name: "Benjamín Galaz", img: "/resena-cliente-barberia-benjamin.webp", time: "Hace 1 semana", text: "Muy buen servicio y calidad de corte de pelo. De tantas barberías que he probado me quedo contento con esta y son todos muy simpáticos." },
  { name: "Faxio Sz", img: "/resena-cliente-barberia-faxio.webp", time: "Hace 1 mes", text: "Muy buena experiencia. El trato fue muy amable y también muy profesional" },
  { name: "Alejandro Dussaubat P.", img: "/resena-cliente-barberia-alejandro.webp", time: "Hace 2 meses", text: "Llevo desde el año pasado cortándome acá y el nivel de atención y profesionalismo siempre es 10/10" }
];

function ServiceItem({ service, index }: { service: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-49% 0px -49% 0px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative flex flex-col md:flex-row md:items-center justify-between p-4 md:p-8 -mx-4 md:-mx-8 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden mb-2 md:hover:-translate-y-2
        ${isInView ? 'bg-white border-black/5 shadow-2xl -translate-y-1' : 'border-transparent bg-transparent shadow-none'} 
        md:!bg-transparent md:!border-transparent md:!shadow-none md:hover:!bg-white md:hover:!border-black/5 md:hover:!shadow-2xl
      `}
    >
       <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 -translate-x-full group-hover:translate-x-full md:group-hover:translate-x-full transition-transform duration-1000" />
       
       <div className="relative z-10 md:w-1/2">
          <h3 className={`text-xl md:text-3xl font-gloock transition-colors duration-300 ${isInView ? 'text-zinc-400' : 'text-zinc-900'} md:!text-zinc-900 md:group-hover:!text-zinc-400`}>{service.name}</h3>
       </div>
       <div className="relative z-10 md:w-1/3 mt-1 md:mt-0">
          <p className={`font-light text-xs md:text-base transition-colors duration-300 ${isInView ? 'text-zinc-800' : 'text-zinc-600'} md:!text-zinc-600 md:group-hover:!text-zinc-800`}>{service.desc}</p>
       </div>
       <div className="relative z-10 md:w-1/6 mt-2 md:mt-0 text-left md:text-right">
          <span className={`text-base md:text-xl font-gloock tracking-wider transition-colors duration-300 font-bold px-4 py-2 rounded-full border inline-block ${isInView ? 'text-zinc-400 bg-zinc-200 border-zinc-800/30' : 'text-zinc-900 bg-black/5 border-black/5'} md:!text-zinc-900 md:!bg-black/5 md:!border-black/5 md:group-hover:!text-zinc-400 md:group-hover:!border-zinc-800/30 md:group-hover:!bg-zinc-200`}>{service.price}</span>
       </div>
    </motion.div>
  );
}

export default function LevelStudioPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-zinc-50 min-h-screen text-zinc-900 overflow-hidden font-sans" >
      
      {/* HERO SECTION */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src="/barberia-las-condes-level-studio.webp"
              alt="Level Studio Barber"
              fill
              className="object-cover object-[center_top] transition-all duration-1000 grayscale"
              priority
            />
            <div className="absolute inset-0 bg-black/40 w-full" />
         </div>
        
        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center h-full mt-4 md:mt-0 text-center">
            <h1 className="sr-only">Level Studio - Barbería Premium en Las Condes</h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-2 md:mb-4">- BARBERÍA LAS CONDES -</motion.p>
            <div className="overflow-hidden mb-6 md:mb-8">
             <motion.div 
               initial={{ y: "110%", opacity: 0 }}
               animate={{ y: "0%", opacity: 1 }}
               transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
               className="relative w-48 h-20 md:w-[400px] md:h-40"
             >
                <Image src="/logo-level-studio-las-condes.webp" alt="Level Studio" fill className="object-contain" />
             </motion.div>
           </div>
           
           <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
           >
             <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" onClick={() => sendGAEvent({ event: 'click_agenda', value: 'boton_agendar' })}>
                <button className="group relative inline-flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all duration-500 bg-white hover:bg-zinc-200 rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1">
                   <span className="relative z-10 flex items-center gap-3">
                     Agendar Cita
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </span>
                </button>
             </a>
           </motion.div>
        </div>
      </section>

      {/* LA EXPERIENCIA */}
      <section className="py-10 md:py-32 px-6 md:px-20 lg:px-40 relative z-20 overflow-hidden bg-zinc-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
             
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="relative aspect-[4/5] w-full max-w-md mx-auto md:max-w-none rounded-xl overflow-hidden shadow-lg"
             >
                <Image src="/experiencia-barberia-las-condes.webp" alt="Barber Team" fill className="object-cover object-top hover:scale-105 transition-transform duration-1000" />
             </motion.div>

             <div className="flex flex-col">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-6xl font-gloock tracking-normal text-zinc-900 leading-[1.1] uppercase mb-8 md:mb-12"
                >
                  LA EXPERIENCIA<br/>
                  <span className="font-nothing text-zinc-500 lowercase block mt-2 text-4xl md:text-6xl">definitiva</span>
                </motion.h2>

                <div className="space-y-8">
                     {EXPERIENCE_FEATURES.map((feature, idx) => (
                       <motion.div 
                         key={idx}
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.5, delay: 0.1 + (idx * 0.1) }}
                         className="flex items-start gap-6 group hover:bg-white hover:shadow-xl hover:-translate-y-1 p-4 -m-4 rounded-xl transition-colors duration-300"
                       >
                          <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center shrink-0 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                             <feature.icon className="w-6 h-6" />
                          </div>
                          <div>
                             <h4 className="text-zinc-900 font-bold mb-1 text-lg md:text-xl">{feature.title}</h4>
                             <p className="text-zinc-600 font-light text-xs md:text-base leading-relaxed">{feature.desc}</p>
                          </div>
                       </motion.div>
                     ))}
                </div>
             </div>
          </div>
      </section>

      {/* SCROLL-DRIVEN CAROUSEL WITH CENTER IMAGE */}
      <section className="relative py-10 md:py-32 overflow-hidden min-h-[80vh] flex items-center justify-center bg-white" style={{ backgroundImage: "url('/fondo-concreto-level-studio.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
         <div className="absolute inset-0 bg-white/40 z-0"></div>
        <div className="absolute inset-0 flex flex-col justify-center space-y-4 -z-0">
           <motion.h2 
             style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]) }}
             className="text-[10vw] md:text-[8vw] font-gloock uppercase text-zinc-900 whitespace-nowrap leading-none opacity-90"
           >
             LEVEL STUDIO. LEVEL STUDIO. LEVEL STUDIO. LEVEL STUDIO.
           </motion.h2>
           <motion.h2 
             style={{ x: useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]) }}
             className="text-[10vw] md:text-[8vw] font-gloock uppercase text-zinc-900 whitespace-nowrap leading-none opacity-90"
           >
             LEVEL STUDIO. LEVEL STUDIO. LEVEL STUDIO. LEVEL STUDIO.
           </motion.h2>
        </div>

        <div className="relative z-10 w-full max-w-6xl min-h-[600px] mt-10">
           <motion.div 
             style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"]) }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 aspect-[3/4] shadow-2xl shadow-black/80 z-20"
           >
             <Image 
               src="/corte-de-pelo-hombre-las-condes.webp" 
               alt="Level Studio Cutting"
               fill
               className="object-cover rounded-sm saturate-75 brightness-110 hover:saturate-100 transition-all duration-700"
             />
           </motion.div>

           <motion.div 
             style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
             className="absolute top-0 md:top-10 left-4 md:left-20 w-48 md:w-80 aspect-[3/4] shadow-2xl shadow-black/80 z-10"
           >
             <Image 
               src="/fachada-level-studio-las-condes.webp" 
               alt="Level Studio Exterior"
               fill
               className="object-cover rounded-sm saturate-75 brightness-110 hover:saturate-100 transition-all duration-700"
             />
           </motion.div>

           <motion.div 
             style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "25%"]) }}
             className="absolute bottom-0 right-4 md:right-20 w-48 md:w-80 aspect-[3/4] shadow-2xl shadow-black/80 z-30"
           >
             <Image 
               src="/barberia-premium-corte-de-barba.webp" 
               alt="Level Studio Shave"
               fill
               className="object-cover rounded-sm saturate-75 brightness-110 hover:saturate-100 transition-all duration-700"
             />
           </motion.div>
        </div>
      </section>

      {/* MENU DE SERVICIOS */}
      <section className="py-10 md:py-32 px-6 md:px-20 lg:px-40 bg-transparent text-zinc-900 relative z-20 overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-5xl font-gloock tracking-normal uppercase mb-6 md:mb-8 text-center"
            >
              Nuestros <span className="text-zinc-500 font-nothing normal-case tracking-tight block md:inline">Servicios</span>
            </motion.h2>

             <div className="flex flex-col mt-8">
                {SERVICES.map((service, i) => (
                  <ServiceItem key={i} service={service} index={i} />
                ))}
             </div>

             <div className="mt-16 flex justify-center">
                <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" onClick={() => sendGAEvent({ event: 'click_agenda', value: 'boton_agendar' })}>
                   <button className="group relative inline-flex items-center justify-center px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all duration-500 bg-transparent border border-zinc-900 hover:bg-zinc-900 hover:text-white border-zinc-900 text-zinc-500 rounded-full overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                      <span className="flex items-center gap-3">
                         Ver Todos los Servicios
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                   </button>
                </a>
             </div>
         </div>
      </section>

      {/* NUESTRO EQUIPO / BARBEROS */}
      <section className="py-10 md:py-32 px-6 md:px-20 lg:px-40 bg-transparent relative z-20">
         <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-4xl md:text-6xl font-gloock tracking-normal uppercase mb-10 md:mb-8 md:mb-16 text-center"
            >
              Nuestros <span className="text-zinc-500 font-nothing normal-case tracking-tight block md:inline mt-2 md:mt-0">Barberos</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {BARBERS.map((barber, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileTap={{ scale: 0.97 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                    className="group relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer"
                  >
                     <Image 
                       src={barber.img} 
                       alt={barber.name} 
                       fill
                       className="object-cover object-top scale-105 md:scale-100 md:group-hover:scale-105 transition-all duration-700"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 md:opacity-80 md:group-hover:opacity-60 transition-opacity duration-500" />
                     
                     <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-0 md:translate-y-8 md:group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-gloock text-2xl md:text-4xl text-white mb-1">{barber.name}</h3>
                        <p className="font-nothing text-zinc-400 text-xl mb-6">{barber.role}</p>
                        
                        <a href={barber.url} target="_blank" rel="noopener noreferrer" className="w-full mb-4" onClick={() => sendGAEvent({ event: 'click_agenda_barbero', value: barber.name })}>
                           <div className="w-full py-3 bg-white text-zinc-900 border-white hover:bg-zinc-200 border text-center uppercase tracking-widest text-xs font-bold transition-colors duration-300">
                             Agendar con {barber.name}
                           </div>
                        </a>
                     </div>
                  </motion.div>
                ))}
             </div>
         </div>
      </section>

      {/* PRODUCTOS PREMIUM SECTION */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-t border-black/5">
         <motion.div className="absolute inset-0 w-full h-full">
            <Image 
              src="/productos-premium-cuidado-personal-barberia.webp" 
              alt="Productos Premium Level Studio" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] scale-[1.25]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply" />
            <div className="absolute inset-0 bg-zinc-900/80" />
         </motion.div>

         <div className="relative z-10 w-full max-w-5xl px-6 md:px-20 text-center flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-zinc-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
            >
              Cuidado Personal en Casa
            </motion.p>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-7xl font-gloock tracking-normal text-white uppercase leading-[0.9] mb-8"
            >
              Línea <span className="font-nothing text-zinc-400 lowercase">Premium</span><br/>de Productos
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-200 font-light leading-relaxed max-w-xl text-sm md:text-lg mb-10"
            >
              Lleva el Método High Level a tu rutina diaria. Cremas de afeitar, aceites para barba y pomadas con diferentes fijaciones, sea salt, polvos de textura entre otros. Disponibles directamente en nuestro Studio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
               <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center mt-4">
                  <a href="https://wa.me/56990118423?text=Hola%20Level%20Studio,%20me%20gustar%C3%ADa%20ver%20la%20disponibilidad%20de%20productos." target="_blank" rel="noopener noreferrer">
                     <button className="group relative inline-flex items-center justify-center px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all duration-500 bg-white border border-white hover:bg-zinc-200 rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                        <span className="flex items-center gap-3">
                           Escribir para Disponibilidad
                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </button>
                  </a>
                  
                  <Link href="#ubicacion">
                     <span className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 border-b border-white/50 hover:border-white pb-1 cursor-pointer">
                        Dónde Comprar
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                     </span>
                  </Link>
               </div>
            </motion.div>
         </div>
      </section>

      {/* REVIEWS */}
      <section className="py-10 md:py-32 px-6 md:px-20 lg:px-40 bg-transparent relative z-20 border-t border-black/5 overflow-hidden">
         <div className="max-w-7xl mx-auto">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-8 md:mb-16 text-center md:text-left"
             >
                 <div>
                     <h2 className="text-4xl md:text-6xl font-gloock tracking-normal uppercase text-zinc-900">
                         Reseñas de <br className="hidden md:block"/><span className="text-zinc-500 font-nothing normal-case tracking-tight block md:inline mt-2 md:mt-0">Nuestros Clientes</span>
                     </h2>
                 </div>
                 <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
                     <p className="font-bold text-xs uppercase tracking-[0.2em] text-zinc-600 mb-2">
                        5.0/5 (+100 opiniones en Google)
                     </p>
                     <div className="flex gap-1 text-zinc-500 text-2xl">
                         ★ ★ ★ ★ ★
                     </div>
                 </div>
             </motion.div>
             
             <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
                 {REVIEWS.map((review, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="bg-white shadow-lg p-8 border border-black/5 hover:shadow-xl transition-shadow flex flex-col justify-between w-[280px] md:w-[350px] whitespace-normal snap-center shrink-0 rounded-2xl"
                    >
                       <div>
                          <div className="flex justify-between items-start mb-6">
                             <div className="flex items-center gap-4">
                                 {review.img ? (
                                     <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/10 shrink-0">
                                         <Image src={review.img} alt={review.name} fill className="object-cover" />
                                     </div>
                                 ) : (
                                     <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-600 shrink-0">
                                         {review.name.charAt(0)}
                                     </div>
                                 )}
                                 <div>
                                     <h4 className="font-bold text-sm text-zinc-900 tracking-wider uppercase">{review.name}</h4>
                                     <p className="text-xs text-zinc-500 font-light mt-1">{review.time}</p>
                                 </div>
                             </div>
                             <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                          </div>
                          <div className="flex gap-1 mb-6 text-zinc-400 text-sm">
                              ★ ★ ★ ★ ★
                          </div>
                          <p className="text-sm font-light text-zinc-900 leading-relaxed italic">
                              "{review.text}"
                          </p>
                       </div>
                    </motion.div>
                 ))}
             </div>
             
             <div className="mt-12 flex justify-center">
                <a href="https://g.page/r/CVALOLFuHvPREBM/review" target="_blank" rel="noopener noreferrer">
                   <button className="group relative inline-flex items-center justify-center px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all duration-500 bg-transparent border border-zinc-900 hover:bg-zinc-900 hover:text-white rounded-full overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                      <span className="flex items-center gap-3">
                         Dejar una Reseña
                         <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </span>
                   </button>
                </a>
             </div>
         </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="ubicacion" className="py-10 md:py-32 px-6 md:px-20 lg:px-40 bg-transparent text-zinc-900 relative z-20 border-t border-black/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
               <h2 className="text-4xl md:text-7xl font-gloock uppercase mb-8 leading-[0.9]">
                  Nuestra<br/><span className="text-zinc-500 font-nothing normal-case tracking-tight">Ubicación</span>
               </h2>
               <p className="font-bold uppercase tracking-[0.2em] text-zinc-600 mb-4 text-sm">Av. Apoquindo 4900, Loc 29, Las Condes, Región Metropolitana</p>
               <p className="text-zinc-600 font-light text-sm mb-6 md:mb-10 max-w-sm leading-relaxed">Encuéntranos en el sector más exclusivo de la ciudad. Diseñamos este espacio para brindarte privacidad, confort y resultados del más alto nivel.</p>
               
               <div className="flex flex-col gap-4 font-gloock text-lg md:text-xl">
                  <div className="flex justify-between border-b border-black/5 pb-4">
                     <span className="text-zinc-600">Lunes - Viernes</span>
                     <span>10:00 - 19:30</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-4">
                     <span className="text-zinc-600">Sábado</span>
                     <span>10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between border-b border-black/5 pb-4">
                     <span className="text-zinc-600">Domingo</span>
                     <span>Cerrado</span>
                  </div>
               </div>
               
               <a href="https://www.google.com/maps/search/?api=1&query=Level+Studio+Las+Condes" target="_blank" rel="noreferrer" className="mt-12 inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-900 group">
                  <span className="border-b border-white group-hover:border-zinc-900 group-hover:text-zinc-500 transition-colors">Abrir en Google Maps</span>
                  <ArrowRight className="w-4 h-4 group-hover:text-zinc-500 group-hover:translate-x-2 transition-all" />
               </a>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative aspect-square md:aspect-[4/5] w-full bg-transparent overflow-hidden border border-black/5 p-2"
            >
               <iframe 
                  title="Mapa de ubicación Level Studio"
                  src="https://maps.google.com/maps?q=Level+Studio+-+Barbería+en+Las+Condes&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(100%) invert(100%) contrast(120%) hue-rotate(180deg)" }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="bg-transparent"
               ></iframe>
            </motion.div>
         </div>
      </section>

      {/* FOOTER PRO */}
      <footer className="relative pt-32 pb-10 px-6 md:px-20 lg:px-40 overflow-hidden border-t border-black/5 bg-white" style={{ backgroundImage: "url('/concrete.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
         <div className="absolute inset-0 bg-white/40 z-0"></div>
         
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5 flex flex-col leading-[0.8] select-none">
            <span className="text-[15vw] font-gloock uppercase tracking-tighter">LEVEL</span>
            <span className="text-[15vw] font-gloock uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px white" }}>STUDIO</span>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-24">
               <div className="lg:col-span-2 flex flex-col items-start">
                  <div className="relative w-32 h-10 mb-8">
                     <Image src="/logo-level-studio-v2.png" alt="Level Studio Logo" fill className="object-contain " />
                  </div>
                  <p className="text-zinc-600 text-lg mb-8 max-w-sm font-light">
                     La experiencia definitiva en grooming masculino. Precisión, estilo y un método diseñado para el hombre profesional.
                  </p>
                  <a href={AGENDA_URL} target="_blank" rel="noopener noreferrer" onClick={() => sendGAEvent({ event: 'click_agenda', value: 'boton_agendar' })}>
                     <button className="group relative inline-flex items-center justify-center px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 transition-all duration-500 bg-transparent border border-zinc-900 hover:bg-zinc-900 rounded-full overflow-hidden">
                        <span className="flex items-center gap-3">
                           Agendar Cita
                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                     </button>
                  </a>
               </div>

               <div className="flex flex-col gap-4">
                  <h3 className="text-zinc-900 font-gloock text-xl mb-4">Contacto</h3>
                  <p className="text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-light">Av. Apoquindo 4900, Loc 29, Las Condes, Región Metropolitana</p>
                  <a href="mailto:contacto@levelstudio.cl" className="text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-light">contacto@levelstudio.cl</a>
                  <a href="tel:+56990118423" className="text-zinc-600 hover:text-zinc-900 transition-colors text-sm font-light">+56 9 9011 8423</a>
                  <div className="flex gap-4 mt-4">
                     <a href="https://www.instagram.com/level_studio._/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Level Studio" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                     </a>
                     <a href="https://www.tiktok.com/@level_studio" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Level Studio" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.61-5.46-.02-.33-.02-.66-.01-.99.15-2.03 1.18-3.91 2.78-5.11 1.56-1.21 3.6-1.68 5.56-1.41.02 1.34-.02 2.68.02 4.02-1.04-.15-2.12-.04-3.07.41-.95.44-1.65 1.3-1.92 2.31-.17.65-.13 1.35.1 1.98.24.64.67 1.2 1.22 1.57.85.58 1.96.67 2.94.38.99-.27 1.78-1.01 2.15-1.97.23-.58.33-1.21.32-1.84V.02z"/></svg>
                     </a>
                  </div>
               </div>
            </div>

            <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-light tracking-wider uppercase">
               <p>© {new Date().getFullYear()} Level Studio. Todos los derechos reservados.</p>
               <div className="flex gap-6">
                  <Link href="/privacidad" className="hover:text-zinc-900 transition-colors">Privacidad</Link>
                  <p>Diseño por <a href="https://colectiohub.com" target="_blank" rel="noopener noreferrer" className="text-zinc-900 font-bold hover:underline transition-all">ColectioHub</a></p>
               </div>
            </div>
         </div>
      </footer>

    </div>
  );
}
