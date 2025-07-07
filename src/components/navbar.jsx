import { useAuth } from "@/context/AuthUserContext";
import { LangToggle } from "./lang-toggle";
import { ModeToggle } from "./theme-toggle";
import ProfileDropdown from "./profile-dropdown";
import { HandHeart } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full fixed bg-background/50 p-3 border-b flex items-center backdrop-blur-md">
      <span className="flex-1 font-semibold uppercase flex flex-row gap-4">
        <HandHeart className="text-primary" />
        Hostel Assist
      </span>
      <span className="flex gap-4 items-center">
        <LangToggle />
        <ModeToggle />
        <ProfileDropdown />
      </span>
    </div>
  );
}
