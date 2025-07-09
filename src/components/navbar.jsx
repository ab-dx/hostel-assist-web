"use client";
import { LangToggle } from "./lang-toggle";
import { ModeToggle } from "./theme-toggle";
import ProfileDropdown from "./profile-dropdown";
import { HousePlus } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Navbar() {
  const path = usePathname();
  const [pathName, setPathName] = useState(path);
  useEffect(() => {
    if (path.toLowerCase().includes("admin")) {
      setPathName("Admin")
    }
    else if (path.toLowerCase().includes("home")) {
      setPathName("Home")
    }
    else if (path.toLowerCase().includes("technician")) {
      setPathName("Technician")
    }
  }, [path])
  return (
    <div className="flex w-full bg-background p-3 border-b items-center backdrop-blur-md">
      <span className="flex-1 font-medium flex flex-row gap-4 items-center">
        <SidebarTrigger />
        {pathName}
      </span>
      <span className="flex gap-4 items-center">
        <LangToggle />
        <ModeToggle />
        <ProfileDropdown />
      </span>
    </div>
  );
}
