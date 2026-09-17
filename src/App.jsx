import React, { useState, useMemo } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Wifi,
  Utensils,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  Tv,
  Layers,
  Zap,
  Camera,
  Heart,
  ExternalLink,
  ChevronRight,
  Droplet,
  X,
  Check,
  Flame,
  Coffee,
  Percent,
} from "lucide-react";

// Image 4 uploaded by user: Building facade with glass panels and wooden finish
import BUILDING_IMAGE from "./assets/Building.jpg";
import LOGO_IMAGE from "./assets/Logo.png";

import ROOM_2_SHARING from "./assets/2sharing.png";
import ROOM_3_SHARING from "./assets/3sharing.png";
import ROOM_4_SHARING from "./assets/4sharing.png";

const FOOD_POSTER_IMAGE = "";
const BANNER_IMAGE = "";
const POSTER_IMAGE = "";

// Reliable backup in case asset environment renders outside direct bundle
const FALLBACK_BUILDING = "/Building.jpg";

const ROOM_PLANS = [
  {
    type: "2 Sharing",
    title: "Double Sharing Room",
    price: "15,000",
    strikePrice: "₹15,500",
    negotiableTag: "Price is Negotiable",
    badge: "High Demand",
    badgeColor: "bg-purple-600",
    image: ROOM_2_SHARING,
    description:
      "Spacious twin luxury setup with extra privacy and personal study area.",
    features: [
      "Ergonomic wooden cot with orthopaedic mattress",
      "Individual dual-door wardrobe with personal lock",
      "Attached bathroom with 24/7 hot water geyser",
      "High-speed dedicated Wi-Fi router coverage",
      "3 times homestyle daily meals (3x Non-Veg weekly)",
    ],
  },
  {
    type: "3 Sharing",
    title: "Triple Sharing Room",
    price: "13,000",
    strikePrice: "₹14,500",
    negotiableTag: "Price is Negotiable",
    badge: "Most Popular",
    badgeColor: "bg-[#E91E63]",
    image: ROOM_3_SHARING,
    description:
      "The optimal balance of social community, personal space, and value.",
    features: [
      "Bright airy room with large exterior ventilation",
      "Individual lockers, clothes racks, and shoe space",
      "Attached private bathroom sanitized daily",
      "Full lift access & automatic washing machine",
      "Self-cooking facility access for tea & snacks",
    ],
  },
  {
    type: "4 Sharing",
    title: "Four Sharing Room",
    price: "11,000",
    strikePrice: "₹11,500",
    negotiableTag: "Price is Negotiable",
    badge: "Best Value",
    badgeColor: "bg-emerald-600",
    image: ROOM_4_SHARING,
    description:
      "Most pocket-friendly accommodation in Cambridge Layout Indiranagar with premium amenities.",
    features: [
      "Affordable luxury living at prime Indiranagar location",
      "Dedicated locked storage for each resident",
      "Attached hygienic bathroom with continuous water",
      "Includes 3 times South & North food daily",
      "24/7 security guard, CCTV, and biometric access",
    ],
  },
];

const AMENITIES = [
  {
    name: "Biometric Access",
    desc: "Keyless smart fingerprint entry strictly for ladies",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 5.92 1.54.24.13.32.45.19.69-.07.15-.2.24-.31.24zm3.08 3.99c-.11 0-.22-.04-.31-.12-4.52-3.8-11.08-3.8-15.6 0-.21.18-.53.15-.71-.07-.18-.21-.15-.53.07-.71 4.97-4.18 12.18-4.18 17.15 0 .22.18.25.5.07.71-.18.12-.42.19-.67.19zM12 9c-2.76 0-5 2.24-5 5 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-3.31 2.69-6 6-6s6 2.69 6 6c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.76-2.24-5-5-5zm0 4c-1.1 0-2 .9-2 2 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.65 1.35-3 3-3s3 1.35 3 3c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.1-.9-2-2-2zm0 4c-.55 0-1 .45-1 1 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.1.9-2 2-2s2 .9 2 2c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-.55-.45-1-1-1z" />
      </svg>
    ),
    badge: "Safe & Secure",
  },
  {
    name: "Free High-Speed Wi-Fi",
    desc: "Uninterrupted fiber routers on every floor for work & study",
    icon: <Wifi className="w-6 h-6" />,
    badge: "Unlimited",
  },
  {
    name: "24/7 Security Guard",
    desc: "Trained stationed watchman guarding main gate round the clock",
    icon: <ShieldCheck className="w-6 h-6" />,
    badge: "Stationed Guard",
  },
  {
    name: "CCTV Surveillance",
    desc: "Continuous multi-camera monitoring on all corridors and entries",
    icon: <Camera className="w-6 h-6" />,
    badge: "Full Coverage",
  },
  {
    name: "Washing Machine",
    desc: "High-capacity automatic washing machines with clothes drying terrace",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-1.99-2-1.99zM18 20H6V4h12v16zm-6-3c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0-8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3z" />
      </svg>
    ),
    badge: "Free Daily Use",
  },
  {
    name: "Refrigerator",
    desc: "Common refrigerators provided on floors for fruits, milk & snacks",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 2h10c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v5h10V4H7zm0 7v9h10v-9H7zm2-5h2v2H9V6zm0 7h2v3H9v-3z" />
      </svg>
    ),
    badge: "On Floors",
  },
  {
    name: "Modern Passenger Lift",
    desc: "Smooth elevator servicing all 4 floors with automatic rescue devices",
    icon: <Layers className="w-6 h-6" />,
    badge: "All Floors",
  },
  {
    name: "Attached Bathrooms + Geyser",
    desc: "Private attached bath with 24-hour continuous hot water",
    icon: <Zap className="w-6 h-6" />,
    badge: "24/7 Hot Water",
  },
  {
    name: "Daily Sanitization",
    desc: "Professional housekeeping team for daily dusting, mopping & bins",
    icon: <Sparkles className="w-6 h-6" />,
    badge: "Hygienic",
  },
  {
    name: "24 Hours Water Supply",
    desc: "Both municipal and dual borewell lines with uninterrupted backup",
    icon: <Droplet className="w-6 h-6" />,
    badge: "Always Available",
  },
];

const FOOD_SPECIALS = [
  {
    name: "Fresh Chapathi & Curry",
    type: "Veg",
    desc: "Soft wheat rotis prepared fresh twice daily",
  },
  {
    name: "Homestyle Chicken Curry",
    type: "Non-Veg",
    desc: "Flavorful spiced gravy served 3 times a week",
  },
  {
    name: "Mixed Veg Curry & Kurma",
    type: "Veg",
    desc: "Nutritious seasonal vegetable preparations",
  },
  {
    name: "Crispy Onion Pakoda",
    type: "Veg",
    desc: "Hot evening tea-time snack special",
  },
  {
    name: "Traditional South Sambar",
    type: "Veg",
    desc: "Slow-cooked lentil stew with fresh drumsticks",
  },
  {
    name: "Comfort Peppery Rasam",
    type: "Veg",
    desc: "Aromatic digestive soup with steamed rice",
  },
  {
    name: "Egg Masala Curry",
    type: "Non-Veg",
    desc: "Rich protein dish served with hot rotis",
  },
  {
    name: "Tadka Dal Fry",
    type: "Veg",
    desc: "North Indian yellow lentils with cumin & ghee",
  },
];

const FAQS = [
  {
    q: "How does the negotiable pricing work?",
    a: "Our base monthly tariffs are 2 Sharing starting from ₹15,000, 3 Sharing from ₹13,000, and 4 Sharing from ₹11,000. Rent is openly negotiable depending on your move-in date, payment plan, and stay duration when you visit our premises.",
  },
  {
    q: "Where is the PG located in Bengaluru?",
    a: "We are situated at: 306, 1st Cross Rd, Halasuru, Cambridge Layout, Indiranagar, Bengaluru, Karnataka 560008. We are near Indiranagar 100 Feet Road, just a 10-minute walk away, and Indiranagar Metro Station is also around a 10-minute walk from the PG.",
  },
  {
    q: "Is Non-Veg food served, and is self-cooking allowed?",
    a: "Yes! We serve 3 times daily meals (Breakfast, Lunch, and Dinner in South & North styles). Wholesome Non-Veg is served 3 times a week. We also offer a dedicated Self-Cooking Kitchen for late night snacking, tea, or special diet needs.",
  },
  {
    q: "What are the main security precautions for ladies?",
    a: "The owners stay at the PG 24/7, so residents always have someone available for support. We also have CCTV coverage in common areas and entrances, along with secure access to help ensure a safe and comfortable environment for all our residents.",
  },

  {
    q: "Are Wi-Fi, electricity, and hot water charged separately?",
    a: "No hidden charges! Wi-Fi, 24/7 hot geyser water, passenger lift, laundry machines, and regular maintenance are all covered under your monthly rent.",
  },
  {
    q: "What is the notice period for vacating the PG?",
    a: "Residents are required to give 30 days' notice before vacating the PG. Please inform the management in advance so we can plan the room availability and complete the checkout process smoothly.",
  },
  {
    q: "Can I visit the PG before booking?",
    a: "Yes, you can visit the PG before making a booking. Please contact us to arrange a convenient time for a PG visit and to check the available rooms.",
  },
];

function BrandEmblem({ className = "w-12 h-12" }) {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <img
        src={LOGO_IMAGE}
        alt="Sky Living PG for Ladies Logo"
        onError={() => setHasError(true)}
        className={`${className} object-contain rounded-full bg-white shadow-xs`}
      />
    );
  }

  return (
    <div
      className={`${className} rounded-full bg-gradient-to-tr from-pink-100 to-purple-100 border border-pink-300 flex items-center justify-center text-[#4A0E4E] font-bold text-xs shadow-xs`}
    >
      <Heart className="w-5 h-5 text-[#E91E63] fill-current" />
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedSharing, setSelectedSharing] = useState("2 Sharing");

  // Booking Form state
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [sharingType, setSharingType] = useState(
    "2 Sharing (Starts ₹15,000 - Negotiable)",
  );
  const [moveDate, setMoveDate] = useState("");
  const [foodType, setFoodType] = useState("Veg & Non-Veg (3x weekly)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppInquiry = (e) => {
    e.preventDefault();
    if (!userName || !userPhone) return;

    setSubmitted(true);
    const textMessage =
      `*Sky Living PG for Ladies - Room Inquiry*%0A` +
      `👤 *Name:* ${encodeURIComponent(userName)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(userPhone)}%0A` +
      `🛏️ *Sharing Choice:* ${encodeURIComponent(sharingType)}%0A` +
      `📅 *Move-In Date:* ${encodeURIComponent(moveDate || "Immediate / Flexible")}%0A` +
      `🍲 *Food:* ${encodeURIComponent(foodType)}%0A` +
      `💬 *Note:* ${encodeURIComponent(notes || "Interested in visiting and discussing negotiable pricing.")}`;

    setTimeout(() => {
      window.open(`https://wa.me/918073328988?text=${textMessage}`, "_blank");
    }, 600);
  };

  return (
    <div
      className="min-h-screen w-full max-w-none bg-[#FFFDFE] text-slate-800 font-sans selection:bg-[#E91E63] selection:text-white relative pb-20 md:pb-0"
      style={{
        width: "100vw",
        maxWidth: "100vw",
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0,
        overflowX: "hidden",
      }}
    >
      {/* FLOATING CALL + WHATSAPP BUTTONS */}
      <aside
        aria-label="Direct Action Buttons"
        style={{
          position: "fixed",
          right: "12px",
          bottom: "90px",
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          width: "60px",
        }}
      >
        {/* CALL BUTTON */}
        <button
          type="button"
          onClick={() => setCallModalOpen(true)}
          aria-label="Call Sky Living PG"
          style={{
            position: "relative",
            width: "58px",
            height: "58px",
            minWidth: "58px",
            minHeight: "58px",
            borderRadius: "50%",
            border: "3px solid white",
            background: "linear-gradient(135deg, #4A0E4E, #7B1FA2, #C2185B)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            cursor: "pointer",
            padding: 0,
            margin: 0,
            flexShrink: 0,
            animation: "skyFloatCall 2.5s ease-in-out infinite",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Phone size={27} strokeWidth={2.5} />

          {/* CALL PULSE */}
          <span
            style={{
              position: "absolute",
              inset: "-5px",
              borderRadius: "50%",
              border: "3px solid #C2185B",
              animation: "skyCallPulse 1.8s infinite",
              pointerEvents: "none",
            }}
          />
        </button>

        {/* WHATSAPP BUTTON */}
        <a
          href="https://wa.me/918073328988?text=Hello%20Sky%20Living%20PG%2C%20I%20want%20to%20know%20about%20room%20availability."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Sky Living PG on WhatsApp"
          style={{
            position: "relative",
            width: "58px",
            height: "58px",
            minWidth: "58px",
            minHeight: "58px",
            borderRadius: "50%",
            border: "3px solid white",
            background: "#25D366",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
            textDecoration: "none",
            padding: 0,
            margin: 0,
            flexShrink: 0,
            animation: "skyFloatWhatsapp 2.5s ease-in-out infinite",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* ORIGINAL WHATSAPP LOGO */}
          <svg
            viewBox="0 0 32 32"
            width="34"
            height="34"
            fill="white"
            aria-hidden="true"
          >
            <path d="M19.11 17.21c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.34-.79-.7-1.32-1.57-1.47-1.84-.15-.27-.02-.42.11-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.6-.65 1.83-1.27.23-.63.23-1.16.16-1.27-.07-.11-.25-.18-.52-.32z" />
            <path d="M16.03 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.39 1.63 6.24L3.2 28.8l6.73-1.76a12.73 12.73 0 0 0 6.1 1.56h.01c7.06 0 12.8-5.74 12.8-12.8S23.1 3.2 16.03 3.2zm0 23.3h-.01a10.5 10.5 0 0 1-5.35-1.46l-.38-.23-3.99 1.04 1.07-3.89-.25-.4a10.5 10.5 0 1 1 8.91 4.94z" />
          </svg>

          {/* WHATSAPP PULSE */}
          <span
            style={{
              position: "absolute",
              inset: "-5px",
              borderRadius: "50%",
              border: "3px solid #25D366",
              animation: "skyWhatsappPulse 1.8s infinite",
              pointerEvents: "none",
            }}
          />
        </a>
      </aside>

      <style>
        {`
    /* CALL: gentle up/down movement */
    @keyframes skyFloatCall {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-7px);
      }
    }

    /* WHATSAPP: gentle opposite movement */
    @keyframes skyFloatWhatsapp {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(7px);
      }
    }

    /* CALL pulse */
    @keyframes skyCallPulse {
      0% {
        transform: scale(0.95);
        opacity: 0.8;
      }
      70% {
        transform: scale(1.35);
        opacity: 0;
      }
      100% {
        transform: scale(0.95);
        opacity: 0;
      }
    }

    /* WHATSAPP pulse */
    @keyframes skyWhatsappPulse {
      0% {
        transform: scale(0.95);
        opacity: 0.8;
      }
      70% {
        transform: scale(1.35);
        opacity: 0;
      }
      100% {
        transform: scale(0.95);
        opacity: 0;
      }
    }
  `}
      </style>

      {/* FLOATING BUTTON ANIMATIONS */}
      <style>
        {`
    @keyframes skyCallPulse {
      0% {
        transform: scale(0.95);
        opacity: 0.8;
      }

      70% {
        transform: scale(1.35);
        opacity: 0;
      }

      100% {
        transform: scale(0.95);
        opacity: 0;
      }
    }

    @keyframes skyWhatsappPulse {
      0% {
        transform: scale(0.95);
        opacity: 0.8;
      }

      70% {
        transform: scale(1.35);
        opacity: 0;
      }

      100% {
        transform: scale(0.95);
        opacity: 0;
      }
    }
  `}
      </style>

      {/* QUICK CALL NUMBERS MODAL POPUP */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-pink-200 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setCallModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-[#4A0E4E] flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-[#E91E63]" />
              </div>
              <h4 className="text-lg font-serif font-bold text-slate-900">
                Direct Manager Contacts
              </h4>
              <p className="text-xs text-slate-500">
                Tap below to call directly for instant tour or price negotiation
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="tel:+918073328988"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-pink-50 hover:bg-pink-100/80 border border-pink-200 transition text-[#4A0E4E] font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4A0E4E] text-white flex items-center justify-center text-xs">
                    1
                  </div>
                  <div>
                    <div className="text-[10px] text-pink-700 font-semibold uppercase">
                      Manager Hotline 1
                    </div>
                    <div>+91 8073328988</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-pink-500" />
              </a>

              <a
                href="tel:+917780423848"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-50 hover:bg-purple-100/80 border border-purple-200 transition text-[#4A0E4E] font-bold text-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#880E4F] text-white flex items-center justify-center text-xs">
                    2
                  </div>
                  <div>
                    <div className="text-[10px] text-purple-700 font-semibold uppercase">
                      Manager Hotline 2
                    </div>
                    <div>+91 7780423848</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-pink-500" />
              </a>
            </div>

            <p className="text-[11px] text-center text-slate-400 mt-4">
              Visiting hours: 8:00 AM to 9:00 PM (Everyday)
            </p>
          </div>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <header className="bg-gradient-to-r from-[#2E0632] via-[#4A0E4E] to-[#880E4F] text-white text-xs py-2 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="bg-[#E91E63] text-white px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase animate-pulse">
              ★ NEWLY OPENED PREMISES
            </span>
            <span className="font-medium text-pink-100 text-center sm:text-left">
              Sky Living PG for Ladies • Cambridge Layout, Halasuru, Indiranagar
            </span>
          </div>

          <div className="flex items-center space-x-4 font-semibold text-pink-100">
            <a
              href="tel:+918073328988"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-pink-300" />
              <span>8073328988</span>
            </a>
            <span className="text-pink-300/40 hidden sm:inline">|</span>
            <a
              href="tel:+917780423848"
              className="flex items-center gap-1 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5 text-pink-300" />
              <span>7780423848</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN NAVIGATION BAR */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-[33px] z-30 border-b border-pink-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo from Flyer */}
            <a href="#hero" className="flex items-center gap-3">
              <BrandEmblem className="w-12 h-12" />
              <div className="flex flex-col">
                <div className="font-serif text-2xl font-bold tracking-tight text-[#4A0E4E] leading-none flex items-center gap-1">
                  SKY{" "}
                  <span className="text-[#C2185B] italic font-normal">
                    Living
                  </span>
                </div>
                <div className="text-[10px] tracking-widest uppercase font-bold text-[#880E4F] mt-0.5 flex items-center gap-1">
                  <span>PG FOR LADIES</span>
                  <span className="text-[#D4AF37]">♥</span>
                </div>
                <div className="text-[9px] text-pink-600 font-medium">
                  Comfort • Safety • Care
                </div>
              </div>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-7 text-sm font-semibold text-slate-700">
              <a href="#building" className="hover:text-[#C2185B] transition">
                Building Photo
              </a>
              <a
                href="#pricing"
                className="hover:text-[#C2185B] transition flex items-center gap-1"
              >
                <span>Room Rates</span>
                <span className="text-[10px] bg-pink-100 text-[#C2185B] font-bold px-1.5 py-0.5 rounded">
                  Negotiable
                </span>
              </a>
              <a href="#amenities" className="hover:text-[#C2185B] transition">
                Amenities
              </a>
              <a href="#food" className="hover:text-[#C2185B] transition">
                Food Menu
              </a>
              <a href="#location" className="hover:text-[#C2185B] transition">
                Location
              </a>
              <a href="#faq" className="hover:text-[#C2185B] transition">
                FAQ
              </a>
            </div>

            {/* Top Action CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              <a
                href="https://wa.me/918073328988?text=Hello%20Sky%20Living%20PG%2C%20I%20am%20interested%20in%20room%20availability%20in%20Cambridge%20Layout."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-emerald-600 text-white shadow-sm transition"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                WhatsApp
              </a>
              <a
                href="#book"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#4A0E4E] hover:bg-[#2E0632] text-white shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Book Visit
              </a>
            </div>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="lg:hidden p-2 rounded-lg text-[#4A0E4E] hover:bg-pink-50"
            >
              {mobileMenuOpen ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drop */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-pink-100 px-4 pt-2 pb-5 space-y-2 shadow-xl">
            <a
              onClick={() => setMobileMenuOpen(false)}
              href="#building"
              className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-pink-50"
            >
              The Building
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              href="#pricing"
              className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-pink-50"
            >
              Room Rates (Negotiable)
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              href="#amenities"
              className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-pink-50"
            >
              Amenities
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              href="#food"
              className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-pink-50"
            >
              Daily Food & Non-Veg
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              href="#location"
              className="block px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-pink-50"
            >
              Location Map
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                onClick={() => setMobileMenuOpen(false)}
                href="#book"
                className="text-center py-2.5 rounded-xl bg-[#4A0E4E] text-white font-bold text-xs uppercase"
              >
                Schedule a Free Visit
              </a>
              <a
                href="tel:+918073328988"
                className="text-center py-2.5 rounded-xl border border-[#4A0E4E] text-[#4A0E4E] font-bold text-xs uppercase"
              >
                Call: 8073328988
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION WITH USER'S 4TH IMAGE PROMINENTLY SHOWCASED */}
      <section
        id="hero"
        className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FFF0F5] via-white to-pink-50/40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-[#880E4F] text-xs font-bold">
                <Sparkles className="w-4 h-4 text-[#E91E63]" />
                <span>
                  Newly Opened Luxury Building in Cambridge Layout, Indiranagar
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#2E0632] tracking-tight leading-[1.12]">
                A Home Away From Home <br />
                <span className="bg-gradient-to-r from-[#4A0E4E] via-[#C2185B] to-[#E91E63] bg-clip-text text-transparent italic font-normal">
                  Exclusively For Ladies at Indiranagar
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Experience supreme security, cleanliness, and comfort in our
                brand-new glass facade building. Featuring fully furnished{" "}
                <strong>2, 3 & 4 Sharing Rooms</strong>, 3 times daily meals,
                elevator, and biometric safety.
              </p>

              {/* Highlighting Negotiable Pricing in Hero */}
              <div className="bg-white p-4 rounded-2xl border-2 border-pink-200 shadow-sm max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#4A0E4E] flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-[#E91E63]" />
                    Sharing Options & Rates:
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    All Prices Negotiable
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-pink-50 border border-pink-100">
                    <div className="text-[11px] font-semibold text-slate-500">
                      2 Sharing
                    </div>
                    <div className="font-serif font-bold text-base text-[#4A0E4E]">
                      Starts ₹15,000
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">
                      Negotiable
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-pink-50 border border-pink-100">
                    <div className="text-[11px] font-semibold text-slate-500">
                      3 Sharing
                    </div>
                    <div className="font-serif font-bold text-base text-[#4A0E4E]">
                      Starts ₹13,000
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">
                      Negotiable
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-pink-50 border border-pink-100">
                    <div className="text-[11px] font-semibold text-slate-500">
                      4 Sharing
                    </div>
                    <div className="font-serif font-bold text-base text-[#4A0E4E]">
                      Starts ₹11,000
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">
                      Negotiable
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <a
                  href="#pricing"
                  className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#4A0E4E] hover:bg-[#2E0632] text-white shadow-lg hover:shadow-pink-900/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-pink-300" />
                  <span>View Sharing Details</span>
                </a>
                <a
                  href="tel:+918073328988"
                  className="px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider border-2 border-[#4A0E4E] text-[#4A0E4E] hover:bg-pink-50 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#E91E63]" />
                  <span>Call 8073328988</span>
                </a>
              </div>

              {/* Flyer Motto Bar */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-[#4A0E4E] uppercase tracking-wider pt-2">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-current" />{" "}
                  LIVE
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-current" />{" "}
                  LEARN
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-current" />{" "}
                  GROW
                </span>
              </div>
            </div>

            {/* Right Column: User's 4th Image of the Actual Building */}
            <div className="lg:col-span-5 relative" id="building">
              <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-pink-300 via-purple-300 to-amber-200 shadow-2xl">
                <div className="bg-white rounded-2xl overflow-hidden relative group">
                  {/* Real building photograph from user */}
                  <div className="relative h-[460px] sm:h-[500px] w-full bg-slate-900 overflow-hidden">
                    <img
                      src={BUILDING_IMAGE}
                      alt="Sky Living PG for Ladies Building Exterior"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_BUILDING;
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                    />

                    {/* Verified badge */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-full px-3 py-1.5 text-[11px] font-bold text-[#4A0E4E] shadow-md flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Real Building Exterior</span>
                    </div>

                    {/* Bottom banner matching facade */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-10 text-white">
                      <div className="bg-[#3B1F17]/90 border border-amber-500/40 rounded-xl p-3 shadow-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                              Modern Glass & Wood Facade
                            </div>
                            <h3 className="text-base font-bold text-white tracking-wide">
                              SKY Living PG for Ladies
                            </h3>
                            <p className="text-[11px] text-pink-200">
                              306, 1st Cross, Cambridge Layout, Indiranagar
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="bg-[#E91E63] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                              Open Now
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature strip below building image */}
                  <div className="p-3 bg-pink-50 border-t border-pink-100 flex items-center justify-between text-xs text-slate-700">
                    <span className="font-semibold text-[#4A0E4E]">
                      ✓ 4 Storeys with Elevator
                    </span>
                    <span className="font-semibold text-[#E91E63]">
                      ✓ Biometric Main Gate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHT BAR */}
      <section className="bg-gradient-to-r from-[#2E0632] via-[#4A0E4E] to-[#2E0632] text-white py-4 border-y border-pink-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2 border-r border-pink-800/50">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                ₹11,000*
              </div>
              <div className="text-[11px] uppercase tracking-wider text-pink-100">
                Starts From (Negotiable)
              </div>
            </div>
            <div className="p-2 border-r border-pink-800/50">
              <div className="text-xl sm:text-2xl font-serif font-bold text-pink-200">
                3x Daily Meals
              </div>
              <div className="text-[11px] uppercase tracking-wider text-pink-100">
                South & North Homestyle
              </div>
            </div>
            <div className="p-2 border-r border-pink-800/50">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">
                3x Non-Veg
              </div>
              <div className="text-[11px] uppercase tracking-wider text-pink-100">
                Chicken / Egg Curries
              </div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-300">
                100% Safe
              </div>
              <div className="text-[11px] uppercase tracking-wider text-pink-100">
                Biometric + 24/7 CCTV
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING & ROOM SHARING SECTION (2, 3 & 4 SHARING WITH NEGOTIABLE LABELS) */}
      <section
        id="pricing"
        className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-pink-50/30 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#C2185B] text-xs font-bold uppercase tracking-wider">
              <span>Room Options & Transparent Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E0632]">
              Choose Your Sharing Preference
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              All rooms come fully furnished with wooden cots, orthopaedic
              mattresses, individual lockable wardrobes, and attached hygienic
              bathrooms.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>
                ✨ Special Benefit: All prices are <strong>Negotiable</strong>{" "}
                during your PG visit!
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ROOM_PLANS.map((room) => (
              <div
                key={room.type}
                className="bg-white rounded-3xl overflow-hidden border-2 border-pink-100 hover:border-pink-300 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Header Price Banner */}
                <div className="bg-gradient-to-r from-[#2E0632] via-[#4A0E4E] to-[#880E4F] text-white p-5 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-pink-200 font-medium block uppercase tracking-wider">
                      Starts From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-serif font-extrabold text-white">
                        ₹{room.price}
                      </span>
                      <span className="text-xs text-pink-200 font-normal">
                        /month
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs animate-pulse">
                      Negotiable
                    </span>
                    <div className="text-[10px] text-pink-200 mt-0.5">
                      On Visit / Booking
                    </div>
                  </div>
                </div>

                {/* Card Image */}
                <div className="relative h-48 bg-slate-200 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div
                    className={`absolute top-3 right-3 ${room.badgeColor} text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow`}
                  >
                    {room.badge}
                  </div>
                  <div className="absolute bottom-2 left-3 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-lg text-xs font-bold text-[#4A0E4E]">
                    {room.type}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        {room.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      {room.description}
                    </p>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 mb-4 text-center">
                      <span className="text-xs font-bold text-emerald-800">
                        🤝 Rent: Starts ₹{room.price} (Openly Negotiable)
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-700">
                      {room.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Tariff
                      </span>
                      <span className="text-sm font-bold text-[#4A0E4E]">
                        ₹{room.price}{" "}
                        <span className="text-xs text-emerald-600 font-semibold">
                          (Negotiable)
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSharing(room.type);
                        setSharingType(
                          `${room.type} (Starts ₹${room.price} - Negotiable)`,
                        );
                        document
                          .getElementById("book")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#4A0E4E] hover:bg-[#2E0632] text-white transition shadow-sm hover:shadow"
                    >
                      Book Bed
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Negotiable Price Notice Banner */}
          <div className="mt-10 bg-white border border-pink-200 rounded-2xl p-4 shadow-xs text-center text-xs text-[#4A0E4E] font-semibold flex flex-wrap items-center justify-center gap-6">
            <span>
              ✨ <strong>2 Sharing:</strong> Starts ₹15,000 (Negotiable)
            </span>
            <span>
              ✨ <strong>3 Sharing:</strong> Starts ₹13,000 (Negotiable)
            </span>
            <span>
              ✨ <strong>4 Sharing:</strong> Starts ₹11,000 (Negotiable)
            </span>
            <span>✨ Zero Brokerage (Direct Owner PG)</span>
            <span>✨ 3x Daily Food + Wi-Fi Included</span>
          </div>
        </div>
      </section>

      {/* AMENITIES SECTION */}
      <section
        id="amenities"
        className="py-16 md:py-24 bg-white border-t border-pink-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2185B] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
              All Modern Amenities Included
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E0632]">
              Designed for Convenience & Freedom
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need for peaceful, comfortable living without any
              hidden utility charges.
            </p>
          </div>

          {/* ================= 24/7 SELF COOKING ================= */}
          <div className="mb-10">
            <div
              className="relative overflow-hidden rounded-[2rem] border-2 border-pink-200 shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #fff8fb 0%, #fff4ed 45%, #fff8e8 100%)",
              }}
            >
              {/* Decorative background circles */}
              <div className="absolute -left-20 -bottom-20 w-56 h-56 rounded-full bg-pink-300/20 blur-2xl" />
              <div className="absolute right-20 -top-20 w-56 h-56 rounded-full bg-orange-200/30 blur-3xl" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* ================= LEFT 24/7 BADGE ================= */}
                <div className="lg:col-span-3 flex flex-col items-center justify-center p-6 sm:p-8">
                  <div
                    className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center border-8 border-pink-100 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #ff3d81, #d81b60)",
                    }}
                  >
                    <span className="text-3xl sm:text-4xl font-black text-white">
                      24/7
                    </span>

                    <span className="text-sm font-bold tracking-widest text-white">
                      OPEN
                    </span>

                    {/* rotating decorative ring */}
                    <div
                      className="absolute inset-[-10px] rounded-full border-2 border-dashed border-pink-400 animate-spin"
                      style={{ animationDuration: "8s" }}
                    />
                  </div>

                  <div className="mt-5 px-6 py-3 rounded-2xl bg-white/80 border border-pink-200 shadow-sm text-center">
                    <p className="font-bold text-[#4A0E4E] text-sm">
                      YOUR KITCHEN
                    </p>
                    <p className="font-bold text-[#C2185B] text-sm">
                      YOUR TIME
                    </p>
                  </div>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className="lg:col-span-6 px-5 sm:px-8 lg:px-4 py-7 text-center lg:text-left">
                  {/* Small badge */}
                  <span
                    className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{
                      background: "#fde1ec",
                      color: "#d81b60",
                    }}
                  >
                    COOK • EAT • BE HAPPY
                  </span>

                  {/* TITLE */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-4">
                    <h3
                      className="text-3xl sm:text-4xl font-black"
                      style={{
                        fontFamily: "Georgia, serif",
                        color: "#4A0E4E",
                      }}
                    >
                      24/7 Self Cooking Available
                    </h3>

                    <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold animate-pulse">
                      AVAILABLE
                    </span>
                  </div>

                  {/* SUBTITLE */}
                  <p className="mt-3 text-xl sm:text-2xl font-bold text-[#E91E63]">
                    Cook Anytime • Day or Night
                  </p>

                  {/* DESCRIPTION */}
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                    Use our fully equipped self-cooking kitchen whenever you
                    want and prepare your favourite meals at your convenience.
                  </p>

                  {/* FEATURE BADGES */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-6">
                    {/* FEATURE 1 */}
                    <div className="rounded-2xl bg-white/80 border border-pink-200 p-3 text-center shadow-sm">
                      <Utensils className="w-6 h-6 mx-auto text-pink-500" />

                      <p className="mt-2 text-xs font-bold text-[#4A0E4E]">
                        Fully Equipped
                      </p>

                      <p className="text-[10px] text-slate-500">Kitchen</p>
                    </div>

                    {/* FEATURE 2 */}
                    <div className="rounded-2xl bg-white/80 border border-purple-200 p-3 text-center shadow-sm">
                      <span className="text-2xl">🍳</span>

                      <p className="mt-1 text-xs font-bold text-[#4A0E4E]">
                        Cook Your
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Favourite Food
                      </p>
                    </div>

                    {/* FEATURE 3 */}
                    <div className="rounded-2xl bg-white/80 border border-emerald-200 p-3 text-center shadow-sm">
                      <Clock className="w-6 h-6 mx-auto text-emerald-500" />

                      <p className="mt-2 text-xs font-bold text-[#4A0E4E]">
                        No Time
                      </p>

                      <p className="text-[10px] text-slate-500">Restriction</p>
                    </div>

                    {/* FEATURE 4 */}
                    <div className="rounded-2xl bg-white/80 border border-pink-200 p-3 text-center shadow-sm">
                      <Heart className="w-6 h-6 mx-auto text-pink-500 fill-current" />

                      <p className="mt-2 text-xs font-bold text-[#4A0E4E]">
                        Clean & Safe
                      </p>

                      <p className="text-[10px] text-slate-500">Environment</p>
                    </div>
                  </div>
                </div>

                {/* ================= RIGHT KITCHEN AREA ================= */}
                <div className="lg:col-span-3 relative min-h-[230px] lg:min-h-[280px] flex items-center justify-center overflow-hidden">
                  {/* Kitchen illustration */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Counter */}
                    <div className="absolute bottom-8 left-5 right-5 h-5 rounded-full bg-gradient-to-r from-[#d6a56f] to-[#f3c58d] shadow-lg" />

                    {/* Stove */}
                    <div className="absolute bottom-12 w-36 h-5 bg-slate-800 rounded-lg">
                      <div className="absolute left-8 -top-1 w-16 h-3 rounded-full bg-slate-600" />
                    </div>

                    {/* Cooking Pot */}
                    <div className="relative mt-[-25px]">
                      {/* Steam */}
                      <div className="absolute -top-20 left-8 flex gap-3">
                        <span className="text-4xl animate-pulse">♨️</span>
                      </div>

                      {/* Pot */}
                      <div className="w-32 h-20 rounded-b-[2rem] rounded-t-xl bg-gradient-to-b from-slate-300 to-slate-500 shadow-xl border-4 border-slate-400">
                        <div className="absolute -top-3 left-5 right-5 h-5 rounded-full bg-slate-700" />

                        <div className="absolute top-2 left-8 right-8 h-2 rounded-full bg-slate-400" />
                      </div>
                    </div>

                    {/* Food ingredients */}
                    <div className="absolute bottom-16 left-8 flex gap-2 text-2xl">
                      <span>🍅</span>
                      <span>🥕</span>
                      <span>🥦</span>
                    </div>

                    {/* GOOD FOOD MESSAGE */}
                    <div className="absolute top-5 right-4 text-center">
                      <p
                        className="text-lg sm:text-xl font-bold italic"
                        style={{
                          fontFamily: "Georgia, serif",
                          color: "#6b277d",
                        }}
                      >
                        Good Food
                      </p>

                      <p
                        className="text-lg sm:text-xl font-bold italic"
                        style={{
                          fontFamily: "Georgia, serif",
                          color: "#6b277d",
                        }}
                      >
                        Good Mood
                      </p>

                      <p className="text-pink-500 text-xl">Always! ♥</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= BOTTOM MESSAGE ================= */}
              <div
                className="relative px-5 py-3 text-center font-bold text-sm sm:text-base"
                style={{
                  background:
                    "linear-gradient(90deg, #fce0eb, #fff1f5, #fce0eb)",
                  color: "#6b277d",
                }}
              >
                🍳 Cook Anytime • Your Kitchen • Your Time • Your Comfort ❤️
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {AMENITIES.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-pink-50/60 p-5 rounded-2xl border border-slate-100 hover:border-pink-200 transition text-center group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-white shadow-sm text-[#C2185B] flex items-center justify-center mb-3 group-hover:scale-110 transition">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2">
                  <span className="inline-block text-[10px] font-bold text-[#880E4F] bg-white border border-pink-200 px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Self Cooking Kitchen Spotlight */}
          <div className="mt-12 bg-gradient-to-r from-[#4A0E4E] via-[#880E4F] to-[#4A0E4E] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-pink-500/40 text-pink-200 text-[11px] uppercase font-bold px-3 py-1 rounded-full border border-pink-400/30">
                Self-Cooking Facility
              </span>
              <h3 className="text-2xl font-serif font-bold">
                Kitchen Access Whenever You Need
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm max-w-xl leading-relaxed">
                In addition to 3 times prepared meals, all residents enjoy
                access to a clean <strong>Self-Cooking Space</strong> equipped
                with induction stoves and sink for making midnight coffee, teas,
                or health recipes!
              </p>
            </div>
            <a
              href="#book"
              className="px-6 py-3 rounded-full bg-white text-[#4A0E4E] font-bold text-xs uppercase tracking-wider hover:bg-pink-50 transition shadow-md flex-shrink-0"
            >
              Book Room Tour
            </a>
          </div>
        </div>
      </section>

      {/* ================= ORIGINAL SKY LIVING PG FOOD MENU ================= */}
      <section
        id="food"
        className="py-14 md:py-20 border-t border-pink-100"
        style={{
          background:
            "linear-gradient(180deg, #fff8fb 0%, #fffdfd 45%, #fff5f9 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= MENU HEADER ================= */}
          <div className="relative overflow-hidden rounded-[2rem] border border-pink-200 bg-white shadow-xl mb-8">
            {/* Decorative flowers */}
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-pink-100/60 blur-3xl"></div>
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-purple-100/60 blur-3xl"></div>

            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="grid md:grid-cols-12 gap-6 items-center">
                {/* LOGO */}
                <div className="md:col-span-4 flex justify-center">
                  <div
                    className="relative rounded-full p-2 shadow-lg"
                    style={{
                      background:
                        "linear-gradient(135deg, #f7b6d2, #ffffff, #e9b8e8)",
                    }}
                  >
                    <div className="bg-white rounded-full p-3 border-2 border-pink-200">
                      <img
                        src={LOGO_IMAGE}
                        alt="Sky Living PG for Ladies"
                        className="w-36 h-36 sm:w-44 sm:h-44 object-contain rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* TITLE */}
                <div className="md:col-span-8 text-center">
                  <div
                    className="inline-block px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase mb-4"
                    style={{
                      background: "#fde1ec",
                      color: "#d81b60",
                    }}
                  >
                    Healthy • Hygienic • Homemade
                  </div>

                  <h2
                    className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
                    style={{
                      fontFamily: "Georgia, serif",
                      color: "#421052",
                    }}
                  >
                    FOOD MENU
                  </h2>

                  <div className="flex items-center justify-center gap-3 my-3">
                    <span className="h-px w-12 bg-pink-300"></span>
                    <Heart className="w-5 h-5 text-pink-500 fill-current" />
                    <span className="h-px w-12 bg-pink-300"></span>
                  </div>

                  <p
                    className="text-xl sm:text-2xl font-semibold"
                    style={{ color: "#5a286b" }}
                  >
                    Healthy • Hygienic • Homemade
                  </p>

                  {/* Monthly change ribbon */}
                  <div className="mt-5 flex justify-center">
                    <div
                      className="px-6 py-2.5 font-bold text-xs sm:text-sm uppercase tracking-wide text-white"
                      style={{
                        background:
                          "linear-gradient(90deg, #8e246f, #5b176d, #8e246f)",
                        clipPath:
                          "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)",
                      }}
                    >
                      FOOD MAY DIFFER MONTHLY TWICE
                    </div>
                  </div>

                  {/* Comfort / Safety / Care */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-6 mt-7 max-w-xl mx-auto">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                        <Utensils className="w-6 h-6 text-pink-500" />
                      </div>
                      <p className="mt-2 text-xs sm:text-sm font-bold text-[#5a286b]">
                        COMFORT
                      </p>
                    </div>

                    <div className="text-center border-x border-pink-200">
                      <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                        <ShieldCheck className="w-6 h-6 text-pink-500" />
                      </div>
                      <p className="mt-2 text-xs sm:text-sm font-bold text-[#5a286b]">
                        SAFETY
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-pink-500 fill-current" />
                      </div>
                      <p className="mt-2 text-xs sm:text-sm font-bold text-[#5a286b]">
                        CARE
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= DESKTOP WEEKLY MENU ================= */}
          <div className="hidden md:block bg-white rounded-3xl overflow-hidden shadow-xl border border-pink-200">
            {/* TABLE HEADER */}
            <div
              className="grid grid-cols-4 text-white font-bold"
              style={{
                background: "linear-gradient(90deg, #df3977, #e44c83, #d83775)",
              }}
            >
              <div className="p-4 text-center text-lg">DAY</div>
              <div className="p-4 text-center text-lg">BREAKFAST</div>
              <div className="p-4 text-center text-lg">LUNCH</div>
              <div className="p-4 text-center text-lg">DINNER</div>
            </div>

            {/* MONDAY */}
            <div className="grid grid-cols-4 border-b border-pink-100">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-5 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md">
                  MONDAY
                </span>
              </div>

              <div className="p-5 flex items-center text-sm text-slate-700">
                <div>
                  <p>Dosa</p>
                  <p>Chutney</p>
                </div>
              </div>

              <div className="p-5 flex items-center text-sm text-slate-700">
                <div>
                  <p>Rice</p>
                  <p>Any Veg Curry</p>
                  <p>Rasam</p>
                </div>
              </div>

              <div className="p-5 flex items-center text-sm text-slate-700">
                <div>
                  <p>Pulka / Roti / Rice</p>
                  <p>Leaf Pal / Any Fry Item</p>
                </div>
              </div>
            </div>

            {/* TUESDAY */}
            <div className="grid grid-cols-4 border-b border-pink-100">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-5 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md">
                  TUESDAY
                </span>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Idly</p>
                <p>Sambar</p>
                <p>Chutney</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Tomato Rice</p>
                <p>Mango Rice</p>
                <p>Chutney</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Veg Kurma / Rice</p>
                <p>Pulka / Sambar</p>
                <p>Rasam</p>
              </div>
            </div>

            {/* WEDNESDAY */}
            <div className="grid grid-cols-4 border-b border-pink-100">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-4 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md text-sm">
                  WEDNESDAY
                </span>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Puri</p>
                <p>Aloo Channa Masala</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Rice</p>
                <p>Any Veg Curry</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <span className="inline-block mb-1 text-[10px] font-bold bg-pink-500 text-white px-2 py-1 rounded-full">
                  NON-VEG
                </span>
                <p>Egg Rice</p>
                <p>Veg Rice</p>
              </div>
            </div>

            {/* THURSDAY */}
            <div className="grid grid-cols-4 border-b border-pink-100">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-4 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md text-sm">
                  THURSDAY
                </span>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Pasta / Poha /</p>
                <p>Bismilla Bath</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Rice</p>
                <p>Veg Curry</p>
                <p>Dal / Chips</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Pulka / Sambar</p>
                <p>Rice / Fry Item</p>
              </div>
            </div>

            {/* FRIDAY */}
            <div className="grid grid-cols-4 border-b border-pink-100">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-5 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md">
                  FRIDAY
                </span>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Dosa</p>
                <p>Chutney</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Rice</p>
                <p>Veg Curry</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <span className="inline-block mb-2 text-[10px] font-bold bg-pink-500 text-white px-2 py-1 rounded-full">
                  NON-VEG
                </span>

                <p>Rice / Egg Curry /</p>
                <p>Rajma / Mushroom /</p>
                <p>Chapathi / Bannana</p>
              </div>
            </div>

            {/* SATURDAY */}
            <div className="grid grid-cols-4 border-b border-pink-100">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-4 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md text-sm">
                  SATURDAY
                </span>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Chapathi /</p>
                <p>Green Batani Kurma</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Dal / Chutney /</p>
                <p>Papad / Rice</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Veg Biryani / Raita /</p>
                <p>Sweet / Lemon Rice /</p>
                <p>Baji</p>
              </div>
            </div>

            {/* SUNDAY */}
            <div className="grid grid-cols-4">
              <div className="p-5 flex items-center justify-center bg-pink-50">
                <span className="px-5 py-4 rounded-xl bg-gradient-to-br from-[#df3977] to-[#ef5b91] text-white font-bold shadow-md">
                  SUNDAY
                </span>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Lemon Rice /</p>
                <p>Upma / Pasta / Noodles</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <p>Rice / Sambar /</p>
                <p>Fry Item</p>
              </div>

              <div className="p-5 text-sm text-slate-700">
                <span className="inline-block mb-1 text-[10px] font-bold bg-pink-500 text-white px-2 py-1 rounded-full">
                  NON-VEG
                </span>
                <p>Chicken Curry /</p>
                <p>Chicken Biryani /</p>
                <p>Veg Biryani</p>
              </div>
            </div>
          </div>

          {/* ================= MOBILE MENU ================= */}
          <div className="md:hidden space-y-4">
            {[
              {
                day: "MONDAY",
                breakfast: ["Dosa", "Chutney"],
                lunch: ["Rice", "Any Veg Curry", "Rasam"],
                dinner: ["Pulka / Roti / Rice", "Leaf Pal / Any Fry Item"],
              },
              {
                day: "TUESDAY",
                breakfast: ["Idly", "Sambar", "Chutney"],
                lunch: ["Tomato Rice", "Mango Rice", "Chutney"],
                dinner: ["Veg Kurma / Rice", "Pulka / Sambar", "Rasam"],
              },
              {
                day: "WEDNESDAY",
                breakfast: ["Puri", "Aloo Channa Masala"],
                lunch: ["Rice", "Any Veg Curry"],
                dinner: ["Egg Rice", "Veg Rice"],
                nonVeg: true,
              },
              {
                day: "THURSDAY",
                breakfast: ["Pasta / Poha /", "Bismilla Bath"],
                lunch: ["Rice", "Veg Curry", "Dal / Chips"],
                dinner: ["Pulka / Sambar", "Rice / Fry Item"],
              },
              {
                day: "FRIDAY",
                breakfast: ["Dosa", "Chutney"],
                lunch: ["Rice", "Veg Curry"],
                dinner: [
                  "Rice / Egg Curry /",
                  "Rajma / Mushroom /",
                  "Chapathi / Bannana",
                ],
              },
              {
                day: "SATURDAY",
                breakfast: ["Chapathi /", "Green Batani Kurma"],
                lunch: ["Dal / Chutney /", "Papad / Rice"],
                dinner: [
                  "Veg Biryani / Raita /",
                  "Sweet / Lemon Rice /",
                  "Baji",
                ],
              },
              {
                day: "SUNDAY",
                breakfast: ["Lemon Rice /", "Upma / Pasta / Noodles"],
                lunch: ["Rice / Sambar /", "Fry Item"],
                dinner: ["Chicken Curry /", "Chicken Biryani /", "Veg Biryani"],
                nonVeg: true,
              },
            ].map((item) => (
              <div
                key={item.day}
                className="bg-white rounded-2xl overflow-hidden border border-pink-200 shadow-md"
              >
                {/* DAY HEADER */}
                <div
                  className="py-3 text-center text-white font-bold tracking-wide"
                  style={{
                    background: "linear-gradient(90deg, #df3977, #e44c83)",
                  }}
                >
                  {item.day}
                </div>

                <div className="p-4 space-y-4">
                  {/* BREAKFAST */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-pink-500" />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#4A0E4E]">Breakfast</h4>

                      <p className="text-sm text-slate-600 mt-1">
                        {item.breakfast.map((food, i) => (
                          <React.Fragment key={i}>
                            {food}
                            {i < item.breakfast.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* LUNCH */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-pink-500" />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#4A0E4E]">Lunch</h4>

                      <p className="text-sm text-slate-600 mt-1">
                        {item.lunch.map((food, i) => (
                          <React.Fragment key={i}>
                            {food}
                            {i < item.lunch.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>

                  {/* DINNER */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 flex-shrink-0 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center">
                      <Utensils className="w-5 h-5 text-pink-500" />
                    </div>

                    <div>
                      <h4 className="font-bold text-[#4A0E4E]">
                        Dinner
                        {item.nonVeg && (
                          <span className="ml-2 text-[9px] bg-pink-500 text-white px-2 py-1 rounded-full">
                            NON-VEG
                          </span>
                        )}
                      </h4>

                      <p className="text-sm text-slate-600 mt-1">
                        {item.dinner.map((food, i) => (
                          <React.Fragment key={i}>
                            {food}
                            {i < item.dinner.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= BOTTOM NOTE ================= */}
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div
              className="rounded-2xl p-5 border border-pink-200"
              style={{
                background: "linear-gradient(135deg, #fff0f6, #fff9fc)",
              }}
            >
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-full bg-white border border-pink-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Calendar className="w-7 h-7 text-[#6b277d]" />
                </div>

                <div>
                  <h4 className="font-bold text-[#4A0E4E]">Menu Changes</h4>

                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Food items may change twice in a month based on availability
                    & seasonal variations to bring more variety & taste.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl p-5 border border-pink-200 flex items-center justify-center text-center"
              style={{
                background: "linear-gradient(135deg, #fff0f6, #fdf4ff)",
              }}
            >
              <div>
                <p
                  className="text-2xl sm:text-3xl font-bold"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#6b277d",
                  }}
                >
                  Good Food • Good Mood
                </p>

                <p
                  className="text-xl sm:text-2xl font-semibold mt-1"
                  style={{
                    fontFamily: "Georgia, serif",
                    color: "#df3977",
                  }}
                >
                  Happy You! 💕
                </p>
              </div>
            </div>
          </div>

          {/* ================= MEAL TIMINGS ================= */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-pink-200 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-[#4A0E4E]">Breakfast</h4>

                <span className="text-[10px] sm:text-xs font-bold text-pink-700 bg-pink-50 px-2 py-1 rounded-lg whitespace-nowrap">
                  7:30 AM - 10:00 AM
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Hot Chapathis, Idli, Dosa, Poha, Upma, Poori, with filter coffee
                & tea.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-pink-200 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-[#4A0E4E]">Lunch</h4>

                <span className="text-[10px] sm:text-xs font-bold text-pink-700 bg-pink-50 px-2 py-1 rounded-lg whitespace-nowrap">
                  12:30 PM - 3:00 PM
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Fresh Rotis, Rice, Dal Tadka, Drumstick Sambar, Vegetable
                Poriyal & Curd.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-pink-200 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-[#4A0E4E]">Dinner</h4>

                <span className="text-[10px] sm:text-xs font-bold text-pink-700 bg-pink-50 px-2 py-1 rounded-lg whitespace-nowrap">
                  7:30 PM - 10:00 PM
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600">
                Warm Rotis, Chicken Curry / Chicken Biriyani, Egg Curry, Veg
                Kurma, Rasam & buttermilk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING / INQUIRY FORM */}
      <section
        id="book"
        className="py-16 md:py-24 bg-gradient-to-b from-white to-pink-50/50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-pink-200 overflow-hidden">
            <div className="grid md:grid-cols-12">
              {/* Left Column */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#2E0632] via-[#4A0E4E] to-[#880E4F] p-8 text-white flex flex-col justify-between">
                <div className="space-y-6">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-500/30 text-pink-200 border border-pink-400/30">
                    Direct Booking
                  </span>
                  <h3 className="text-2xl font-serif font-bold">
                    Schedule Your Free Visit
                  </h3>
                  <p className="text-pink-100/80 text-xs leading-relaxed">
                    Come inspect our rooms, test the Wi-Fi, taste the food, and
                    finalize your negotiable rent rate directly with the
                    management.
                  </p>

                  <div className="space-y-3 pt-2 text-xs">
                    <div>
                      <div className="text-pink-300 text-[10px] uppercase font-bold">
                        Call Manager 1
                      </div>
                      <a
                        href="tel:+918073328988"
                        className="font-bold text-base text-white hover:underline"
                      >
                        +91 8073328988
                      </a>
                    </div>
                    <div>
                      <div className="text-pink-300 text-[10px] uppercase font-bold">
                        Call Manager 2
                      </div>
                      <a
                        href="tel:+917780423848"
                        className="font-bold text-base text-white hover:underline"
                      >
                        +91 7780423848
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-pink-800/50 text-[11px] text-pink-200 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>{" "}
                  Instant WhatsApp Confirmation
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="md:col-span-7 p-6 sm:p-8">
                <h4 className="text-xl font-serif font-bold text-slate-800 mb-1">
                  Inquire for Bed Availability
                </h4>
                <p className="text-xs text-slate-500 mb-6">
                  Submit below to open a pre-filled WhatsApp message with our
                  manager.
                </p>

                <form onSubmit={handleWhatsAppInquiry} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E4E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E4E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Sharing Choice
                      </label>
                      <select
                        value={sharingType}
                        onChange={(e) => setSharingType(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E4E] bg-white"
                      >
                        <option value="2 Sharing (Starts ₹15,000 - Negotiable)">
                          2 Sharing (Starts ₹15,000)
                        </option>
                        <option value="3 Sharing (Starts ₹13,000 - Negotiable)">
                          3 Sharing (Starts ₹13,000)
                        </option>
                        <option value="4 Sharing (Starts ₹11,000 - Negotiable)">
                          4 Sharing (Starts ₹11,000)
                        </option>
                        <option value="Any Available Bed">
                          Any Available Bed
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Expected Move-In Date
                      </label>
                      <input
                        type="date"
                        value={moveDate}
                        onChange={(e) => setMoveDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E4E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Diet Preference
                      </label>
                      <select
                        value={foodType}
                        onChange={(e) => setFoodType(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E4E] bg-white"
                      >
                        <option value="Veg & Non-Veg (3x weekly)">
                          South & North Veg + Non-Veg
                        </option>
                        <option value="Pure Vegetarian">
                          Pure Vegetarian Only
                        </option>
                        <option value="Self Cooking / Custom">
                          Self Cooking Preferred
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Notes / Visiting Time (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Visiting this Saturday at 4 PM to discuss pricing"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4A0E4E]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#4A0E4E] hover:bg-[#2E0632] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry on WhatsApp</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                {submitted && (
                  <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    ✓ Opening WhatsApp to chat with PG manager directly...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCATION & GOOGLE MAP ================= */}
      <section
        id="location"
        className="py-12 sm:py-16 md:py-20 bg-white border-t border-pink-100 w-full overflow-hidden"
        style={{
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        <div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          {/* LOCATION CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT SIDE */}
            <div className="lg:col-span-5 min-w-0 space-y-6">
              {/* LOCATION LABEL */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C2185B]">
                <MapPin className="w-4 h-4 flex-shrink-0" />

                <span>Prime Cambridge Layout Location</span>
              </div>

              {/* HEADING */}
              <h2
                className="text-3xl sm:text-4xl font-serif font-bold text-[#2E0632]"
                style={{
                  overflowWrap: "break-word",
                  wordBreak: "normal",
                }}
              >
                Easy Access to Metros & IT Hubs
              </h2>

              {/* OFFICIAL ADDRESS */}
              <div className="p-5 rounded-2xl bg-pink-50 border border-pink-100 space-y-2 w-full">
                <div className="text-xs font-bold uppercase text-[#4A0E4E] tracking-wider">
                  Official PG Address
                </div>

                <p className="text-slate-800 text-sm font-medium leading-relaxed">
                  <strong>Sky Living PG for Ladies</strong>
                  <br />
                  306, 1st Cross Rd, Halasuru, Cambridge Layout,
                  <br />
                  Indiranagar, Bengaluru, Karnataka 560008
                </p>

                {/* PHONE NUMBERS */}
                <div className="pt-2 text-xs text-slate-600 flex flex-wrap items-center gap-4">
                  <a
                    href="tel:+918073328988"
                    className="hover:underline whitespace-nowrap"
                  >
                    📞 <strong>8073328988</strong>
                  </a>

                  <a
                    href="tel:+917780423848"
                    className="hover:underline whitespace-nowrap"
                  >
                    📱 <strong>7780423848</strong>
                  </a>
                </div>
              </div>

              {/* ================= NEARBY PLACES ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {/* HALASURU */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
                  <div className="font-bold text-slate-800 text-sm">
                    Halasuru Metro
                  </div>

                  <div className="text-[#C2185B] font-semibold text-[11px]">
                    ~ 3 mins walk
                  </div>
                </div>

                {/* 100 FEET ROAD */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
                  <div className="font-bold text-slate-800 text-sm">
                    100 Feet Rd Indiranagar
                  </div>

                  <div className="text-[#C2185B] font-semibold text-[11px]">
                    ~ 4 mins away
                  </div>
                </div>

                {/* MG ROAD */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
                  <div className="font-bold text-slate-800 text-sm">
                    MG Road / Trinity
                  </div>

                  <div className="text-[#C2185B] font-semibold text-[11px]">
                    ~ 8 mins away
                  </div>
                </div>

                {/* BAGMANE */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-0">
                  <div className="font-bold text-slate-800 text-sm">
                    Bagmane Tech Park
                  </div>

                  <div className="text-[#C2185B] font-semibold text-[11px]">
                    Quick Commute
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS BUTTON */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=SKY+Living+PG+for+Ladies+indiranagar"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider shadow transition"
              >
                <MapPin className="w-4 h-4 text-pink-400" />

                <span>Open in Google Maps</span>

                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* ================= MAP ================= */}
            <div className="lg:col-span-7 w-full min-w-0">
              <div
                className="rounded-3xl overflow-hidden shadow-xl border-4 border-white relative bg-slate-100 w-full"
                style={{
                  height: "420px",
                  maxWidth: "100%",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0364602569766!2d77.63004437484128!3d12.96951878734566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1728f509088b%3A0x4743608c7cb953a8!2sSKY%20Living%20PG%20for%20Ladies%20indiranagar!5e0!3m2!1sen!2sin!4v1789560412052!5m2!1sen!2sin"
                  title="SKY Living PG for Ladies Indiranagar"
                  loading="lazy"
                  allowFullScreen=""
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C2185B]">
              Resident Questions
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2E0632]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-slate-800 hover:text-[#4A0E4E] transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#C2185B] ml-2 text-lg font-mono">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2E0632] text-slate-300 pt-16 pb-12 border-t border-pink-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pink-900/40">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BrandEmblem className="w-10 h-10" />
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-white tracking-wide">
                    SKY <span className="text-pink-400 italic">Living</span>
                  </span>
                  <span className="text-[10px] tracking-widest text-pink-300 font-semibold uppercase">
                    PG FOR LADIES
                  </span>
                </div>
              </div>
              <p className="text-xs text-pink-100/70 leading-relaxed">
                Comfort • Safety • Care. Newly opened modern ladies
                accommodation in Cambridge Layout, Indiranagar.
              </p>
              <div className="text-xs font-semibold text-pink-300">
                A Home Away From Home ♥
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Room Rates (Negotiable)
              </h4>
              <ul className="space-y-2 text-xs">
                <li>• 2 Sharing: Starts ₹15,000 / month</li>
                <li>• 3 Sharing: Starts ₹13,000 / month</li>
                <li>• 4 Sharing: Starts ₹11,000 / month</li>
                <li>• Price Negotiable on Booking Visit</li>
                <li>• Zero Brokerage Direct Contact</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Inclusions
              </h4>
              <ul className="space-y-1.5 text-xs text-pink-100/80">
                <li>✓ 3 Times Daily Food (South & North)</li>
                <li>✓ 3 Times Weekly Non-Veg (Chicken/Egg)</li>
                <li>✓ Biometric Smart Fingerprint Entry</li>
                <li>✓ High-Speed Wi-Fi & Elevator</li>
                <li>✓ 24/7 Geyser & Stationed Guard</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider">
                Contact PG
              </h4>
              <div className="text-xs space-y-2 text-pink-100/80">
                <p>
                  <strong>Address:</strong>
                  <br />
                  306, 1st Cross Rd, Halasuru, Cambridge Layout, Indiranagar,
                  Bengaluru - 560008
                </p>
                <p>
                  <strong>Manager Hotlines:</strong>
                  <br />
                  <a
                    href="tel:+918073328988"
                    className="text-pink-300 hover:underline font-bold"
                  >
                    8073328988
                  </a>{" "}
                  /
                  <a
                    href="tel:+917780423848"
                    className="text-pink-300 hover:underline font-bold ml-1"
                  >
                    7780423848
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-200/60 gap-4">
            <div>© 2026 Sky Living PG for Ladies. All Rights Reserved.</div>
            <div>Cambridge Layout • Halasuru • Indiranagar, Bengaluru</div>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM QUICK BAR */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-pink-200 p-2.5 z-40 flex items-center justify-between gap-2 shadow-2xl md:hidden">
        <a
          href="tel:+918073328988"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#4A0E4E] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>Call: 8073328988</span>
        </a>

        <a
          href="https://wa.me/918073328988?text=Hello%20Sky%20Living%20PG%2C%20I%20want%20to%20know%20room%20availability%20and%20negotiable%20pricing."
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
