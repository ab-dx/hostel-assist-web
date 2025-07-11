import { Button } from "@/components/ui/button";
import { ArrowUpRight, LogInIcon } from "lucide-react";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import Link from "next/link";

export default function LandingHero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Effortless Hostel Issue Management
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          From reporting to resolution—manage every ticket with ease and accountability.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href="/signup"><Button size="lg" className="rounded-full text-base">
            Sign Up<ArrowUpRight className="!h-5 !w-5" />
          </Button></Link>
          <Link href="/login">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none flex gap-4"
            >
              <LogInIcon />
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};


