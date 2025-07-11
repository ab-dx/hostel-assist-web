import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight, LogInIcon, ShieldHalf, User, Wrench } from "lucide-react";
import { BackgroundPattern } from "@/components/ui/background-pattern";
import Link from "next/link";
import Image from "next/image";


export default function LandingHero() {
  const tools = [
    {
      name: 'GCP',
      url: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg'
    },
    {
      name: 'Firebase',
      url: 'https://www.gstatic.com/mobilesdk/240501_mobilesdk/firebase_28dp.png'
    },
    {
      name: 'Gemini',
      url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.png'
    },
    {
      name: 'Vertex AI',
      url: 'https://images.g2crowd.com/uploads/product/image/small_square/small_square_9b66c50d653ceb1627529897fded7aa8/google-vertex-ai.png'
    },
    {
      name: 'Next',
      url: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nextjs-icon.png'
    },
    {
      name: 'Langgraph',
      url: 'https://registry.npmmirror.com/@lobehub/icons-static-png/1.53.0/files/dark/langgraph-color.png'
    },
  ]
  return (
    <div className="min-h-screen px-6">
      <div className="flex items-center justify-center min-h-[65vh] mt-[10vh]">
        <BackgroundPattern />
        <div className="flex flex-col md:flex-row gap-12">
          <div className="relative z-10 md:text-left text-center max-w-2xl flex-1">
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
              Effortless Hostel Issue Management
            </h1>
            <p className="mt-6 text-[17px] md:text-lg">
              From reporting to resolution—manage every ticket with ease and accountability.
            </p>
            <div className="mt-12 flex items-center md:justify-start justify-center gap-4">
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

          <div className="p-8 flex flex-col">


            <ol className="relative border-s border-gray-200 dark:border-gray-700">
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div className="translate-y-[-40px] flex gap-8 items-center">
                  <div className="shadow-primary/50 shadow-lg border-0 rounded-xl p-2 bg-muted"><User className="text-primary p-2" strokeWidth={1.25} size={80} /></div>
                  <div>
                    <h2 className="font-semibold uppercase tracking-wide text-xl">Student</h2>
                    <p>Recognize an issue. Raise a ticket.</p>
                  </div>
                </div>
              </li>
              <li className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div className="translate-y-[-40px] flex gap-8 items-center">
                  <div className="shadow-primary/50 shadow-lg border-0 rounded-xl p-2 bg-muted"><Wrench className="text-primary p-2" strokeWidth={1.25} size={80} /></div>
                  <div>
                    <h2 className="font-semibold uppercase tracking-wide text-xl">Technician</h2>
                    <p>Resolve an issue with proof.</p>
                  </div>
                </div>
              </li>
              <li className="ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <div className="translate-y-[-40px] flex gap-8 items-center">
                  <div className="shadow-primary/50 shadow-lg border-0 rounded-xl p-2 bg-muted"><ShieldHalf className="text-primary p-2" strokeWidth={1.25} size={80} /></div>
                  <div>
                    <h2 className="font-semibold uppercase tracking-wide text-xl">Admin</h2>
                    <p>Track tickets and costs.</p>
                  </div>
                </div>
              </li>

            </ol>


          </div>


        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-4">
        <span className="text-sm uppercase tracking-widest">Powered by</span>
        <span className="p-4 flex gap-8">
          {tools.map((tool, idx) =>
            <Image key={idx} src={tool.url} width={45} height={45} alt={tool.name} className="grayscale-25" />
          )}
        </span>
      </div>
      <div className="flex justify-center">
        <ArrowDown className="animate-bounce" />
      </div>
    </div>
  );
};


