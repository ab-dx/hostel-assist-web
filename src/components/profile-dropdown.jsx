import { useAuth } from "@/context/AuthUserContext";
import Image from "next/image";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel } from "./ui/dropdown-menu";

export default function ProfileDropdown() {
  const { authUser, signOutUser } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image src={authUser.photoURL || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} width={35} height={35} alt="Profile" className="rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{authUser.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="p-2" onClick={signOutUser}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
