"use client";
import { SidebarFooter } from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthUserContext";
import Image from "next/image";
export function SidebarProfile() {
  const { authUser } = useAuth();
  return (
    <SidebarFooter>
      <div className="flex flex-row items-center gap-2 p-2 bg-muted rounded overflow-hidden">
        <Image src={authUser.photoURL || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} width={35} height={35} alt="Profile" className="rounded-full" />
        <div className="flex flex-col">
          <span className="text-sm">{authUser.displayName}</span>
          <span className="text-xs font-light">{authUser.email}</span>
        </div>
      </div>
    </SidebarFooter>
  );
}
