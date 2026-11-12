// src/components/StatsSection.jsx

import Image from "next/image";
import { Card } from "@heroui/react";
import {
  Briefcase,
  Factory,
  PersonMagnifier,
  Star,
} from "@gravity-ui/icons";

const stats = [
  { value: "50K", label: "Active Jobs", Icon: Briefcase },
  { value: "12K", label: "Companies", Icon: Factory },
  { value: "2M", label: "Job Seekers", Icon: PersonMagnifier },
  { value: "97%", label: "Satisfaction Rate", Icon: Star },
];

export default function StatsSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#050505] px-5 py-20 text-white sm:px-8 sm:py-24">
      {/* Decorative globe background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[34rem] overflow-hidden"
      >
        <Image
          src="/images/globe.png"
          alt=""
          width={1440}
          height={1882}
          priority
          className="absolute left-1/2 top-[-20rem] h-auto w-[180vw] max-w-none -translate-x-1/2 sm:top-[-25rem] sm:w-[min(1100px,125vw)] lg:top-[-27rem]"
        />
        {/* Fades the top edge of the image into the section background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <h2 className="mx-auto mb-8 max-w-2xl text-center text-2xl font-medium leading-snug tracking-tight text-white/80 sm:mb-9 sm:text-3xl">
          Assisting over{" "}
          <span className="text-white">15,000 job seekers</span>
          <br className="hidden sm:block" /> find their dream positions.
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label, Icon }) => (
            <Card
              key={label}
              className="min-h-40 rounded-2xl border border-white/10 bg-[#111111]/90 text-white shadow-lg backdrop-blur-sm"
            >
              <div className="flex h-full min-h-40 flex-col justify-between p-4 sm:p-5">
                <Icon
                  aria-hidden="true"
                  className="h-4 w-4 text-white/90"
                />

                <div>
                  <p className="text-4xl font-semibold tracking-tight">
                    {value}
                  </p>
                  <p className="mt-2 text-xs text-white/80">{label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}