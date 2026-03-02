"use client";

import React from "react";
import { Badge } from "../ui/badge";

const partners = [
  { name: "Anthropic",    logo: "/partners/anthropic.svg" },
  { name: "Gemini",       logo: "/partners/gemini.svg" },
  { name: "OpenAI",       logo: "/partners/openai.png" },
  { name: "Google Cloud", logo: "/partners/googlecloud.svg" },
  { name: "AWS",          logo: "/partners/aws.png" },
  { name: "Supabase",     logo: "/partners/supabase.svg" },
  { name: "Stripe",       logo: "/partners/stripe.svg" },
  { name: "Prisma",       logo: "/partners/prisma.svg" },
  { name: "Clerk",        logo: "/partners/clerk.svg" },
  { name: "ElevenLabs",   logo: "/partners/elevenlabs.svg" },
  { name: "HeyGen",       logo: "/partners/heygen.png" },
  { name: "Twilio",       logo: "/partners/twilio.png" },
];

const duplicated = [...partners, ...partners];

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-3 px-6 py-5 rounded-2xl bg-transparent hover:bg-gray-50 transition-all duration-300 cursor-default select-none min-w-[130px]">
      <img
        src={logo}
        alt={name}
        className="h-10 w-auto object-contain transition-opacity duration-300 grayscale opacity-80  hover:opacity-100"
      />
      <span className="text-[10px] font-semibold text-[#1E293B] tracking-[0.2em] uppercase transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}

export default function OurPartners() {
  return (
    <section className="w-full pt-12 md:pt-16 lg:pt-20 bg-white">

      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-4 max-w-[700px] mx-auto mb-12 md:mb-16">
            <Badge
              variant="outline" className="px-4"
            >
              Trusted integrations
            </Badge>
            <h2 className="ff-jakarta font-bold text-[#000000] md:text-[40px] text-[36px] text-center leading-[120%]">
             Our Partners and Integrations
            </h2>
        <p className="ff-Graphik font-normal text-[#1E293B] md:text-[20px] lg:text-xl text-base text-center md:leading-[30px] leading-[24px]">
          We integrate with the world&apos;s leading AI, cloud, and developer
          platforms so your business runs on proven, enterprise-grade technology.
        </p>
          </div>

      {/* ──  Marquee ── */}
      <div className=" overflow-hidden relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex gap-2 w-max"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {duplicated.map((p, i) => (
            <LogoCard key={`${p.name}-${i}`} name={p.name} logo={p.logo} />
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── DESKTOP: Flex Wrap Grid ── */}
      {/* <div className="hidden md:flex flex-wrap justify-center gap-1 max-w-5xl mx-auto px-8">
        {partners.map((p) => (
          <LogoCard key={p.name} name={p.name} logo={p.logo} />
        ))}
      </div> */}

      {/* ── Bottom rule ── */}
      <div className="mt-20 max-w-4xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>
    </section>
  );
}