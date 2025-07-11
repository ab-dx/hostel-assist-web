"use client";
import FeatureSection from "@/components/features-section";
import LandingHero from "@/components/landing-hero";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Landing() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate each section individually as it enters the viewport
    gsap.utils.toArray(".reveal-section").forEach((section) => {
      gsap.fromTo(
        section,
        { autoAlpha: 0, y: 100 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%", // Triggers when the top of the section hits 75% down the viewport
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);
  return (
    <>
      <LandingHero />
      <FeatureSection />
      <div className="bg-muted/20 rounded-2xl container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">

        <div className="space-y-8 text-center reveal-section">
          <h2 className="text-8xl uppercase dark:text-muted font-extrabold ">
            User View
          </h2>
          <div className="flex flex-col gap-8 p-4 justify-center items-center">
            <Image alt="User view" src="/user-view.png" width={1000} height={1000} className="rounded-2xl shadow hover:scale-110 transition" />
            <p className="text-lg">Create new tickets with ease, with the assistance of AI generated summaries and categorisation.<br /> Track your active and archived tickets and make your mark on the leaderboard!</p>
          </div>
        </div>


        <div className="pt-30 space-y-8 text-center reveal-section ">
          <h2 className="text-8xl uppercase dark:text-muted font-bold">
            Admin View
          </h2>
          <div className="flex flex-col gap-8 p-4 justify-center items-center">
            <Image alt="User view" src="/admin-view.png" width={1000} height={1000} className="rounded-2xl shadow hover:scale-110 transition" />
            <p className="text-lg">Manage existing tickets and track technicians. <br /> Powerful cost estimation using AI agents, introducing accountability into your workflows.</p>
          </div>
        </div>


        <div className="pt-30 space-y-8 text-center reveal-section">
          <h2 className="text-8xl uppercase dark:text-muted font-bold">
            Technician View
          </h2>
          <div className="flex flex-col gap-8 p-4 justify-center items-center">
            <Image alt="User view" src="/tech-view.png" width={400} height={400} className="rounded-2xl shadow hover:scale-110 transition" />
            <p className="text-lg">Automatically assigned tickets in your inbox. Resolve tickets by uploading proof of work and parts used.</p>
          </div>
        </div>

      </div>
      <div className="p-4 justify-center items-center text-muted flex gap-2">
        Made with <Heart size={15} /> by <Link href="http://github.com/ab-dx" className="underline">ab-dx</Link>
      </div>
    </>
  );
};


