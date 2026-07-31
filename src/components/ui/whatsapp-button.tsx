"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
  const [showWsTooltip, setShowWsTooltip] = useState(false);
  const [showLoyaltyTooltip, setShowLoyaltyTooltip] = useState(false);

  // URLs
  const whatsappUrl = "https://wa.me/56990118423?text=Hola%20Level%20Studio,%20me%20gustar%C3%ADa%20hacer%20una%20consulta.";
  const loyaltyUrl = "https://app.dardo.ai/getpass/kcaTxz?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGn4QE4XcgKzkxYnFtDnrS8VNc-MNe_JLKbL4XwmRvO8VmKI7TtzxCqELuPWA0_aem__XzuQp9OFPF6Ositc23UMQ";

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 select-none scale-75 md:scale-100 origin-bottom-right">
      
      {/* Loyalty Card FAB */}
      <div className="relative flex items-center justify-end w-full">
        <AnimatePresence>
          {showLoyaltyTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-[60px] bg-zinc-900 border border-zinc-800 shadow-xl px-4 py-2 rounded-xl text-[11px] font-body font-bold text-white tracking-wide whitespace-nowrap"
            >
              ¡Obtén tu Tarjeta de Beneficios!
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-zinc-900 border-r border-t border-zinc-800 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={loyaltyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Obtener Tarjeta de Fidelización"
          onMouseEnter={() => setShowLoyaltyTooltip(true)}
          onMouseLeave={() => setShowLoyaltyTooltip(false)}
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-12 w-12 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-lg shadow-black/30 transition-colors border border-zinc-700 cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        </motion.a>
      </div>

      {/* WhatsApp FAB */}
      <div className="relative flex items-center justify-end w-full">
        <AnimatePresence>
          {showWsTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 bg-white border border-stone-200/80 shadow-xl shadow-stone-900/10 px-4 py-2.5 rounded-2xl text-[11px] font-body font-semibold text-[#1C1A17] tracking-wide whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ¿Tienes dudas? Escríbenos en vivo
              </div>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-stone-200/80 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          onMouseEnter={() => setShowWsTooltip(true)}
          onMouseLeave={() => setShowWsTooltip(false)}
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25d366]/20 transition-colors border border-emerald-400/30 group cursor-pointer"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white transition-transform duration-300 group-hover:rotate-12">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.709 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.a>
      </div>

    </div>
  );
}
