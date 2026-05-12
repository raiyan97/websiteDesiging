import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WA_NUMBER = "916388719053";
const WA_MSG = encodeURIComponent("Welcome to M.R Digital Solutions  We create premium websites, mobile apps, AI-powered systems, and digital solutions to help your business grow faster.Let’s turn your ideas into reality!");
const PHONE = "+916388719053";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      {/* CALL (top) */}
      <a
        href={`tel:${PHONE}`}
        aria-label="Call us"
        data-cursor="hover"
        className="group relative grid h-14 w-14 place-items-center rounded-full text-white transition-all duration-300 hover:scale-110 glass glow-border"
        style={{
          background: "var(--gradient-primary)",
          boxShadow: "0 10px 30px -5px oklch(0.66 0.21 264 / 0.6)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-60 animate-ping"
          style={{ background: "oklch(0.66 0.21 264 / 0.35)" }}
        />
        <Phone className="relative h-6 w-6 animate-pulse" />
      </a>

      {/* WHATSAPP (bottom) */}
    {/* WHATSAPP (bottom) */}
<a
  href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp"
  data-cursor="hover"
  className="group relative grid h-14 w-14 place-items-center rounded-full text-white transition-all duration-300 hover:scale-110"
  style={{
    background: "linear-gradient(135deg, #25D366, #128C7E)",
    boxShadow:
      "0 10px 30px -5px rgba(37, 211, 102, 0.6), 0 0 24px rgba(37, 211, 102, 0.35)",
  }}
>
  <span
    className="pointer-events-none absolute inset-0 rounded-full opacity-60 animate-ping"
    style={{ background: "rgba(37, 211, 102, 0.35)" }}
  />

  <FaWhatsapp className="relative h-7 w-7" />
</a>
    </div>
  );
}
