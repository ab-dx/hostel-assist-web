"use client";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { SidebarProfile } from "./sidebar-profile";
import { HousePlus, Tickets, Trophy, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthUserContext";

export function UserSidebar() {
  const { signOutUser } = useAuth()
  return (
    <Sidebar>
      <SidebarHeader className="px-8 py-6 text-center text-foreground flex flex-row items-center">
        <HousePlus className="text-primary" size={60} />
        <span className="text-xl font-semibold">Hostel Assist</span>
      </SidebarHeader>
      <SidebarContent className="px-8 flex py-16">
        <div className="flex flex-col gap-2">
          <Link href="/home"><span className="flex flex-row items-center gap-4 hover:bg-muted p-2 rounded transition"><Tickets /> Tickets</span></Link>
          <Link href="/home/leaderboard"><span className="flex flex-row items-center gap-4 hover:bg-muted p-2 rounded transition"><Trophy /> Leaderboard</span></Link>
          <span onClick={signOutUser} className="flex flex-row items-center gap-4 hover:bg-muted p-2 rounded transition"><LogOut /> Sign Out</span>
        </div>
      </SidebarContent>
      <SidebarProfile />
    </Sidebar>
  )
}
