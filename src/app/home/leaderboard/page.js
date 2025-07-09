"use client";
import Navbar from "@/components/navbar";
import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TicketCard from "@/components/ticket-card";
import LoadingPage from "@/components/loading-page";
import TicketDialog from "@/components/ticket-dialog";
import { useUserTickets } from "@/lib/useUserTickets";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
import axios from "axios";
import LeaderboardTable from "@/components/leaderboard-table";

export default function Leaderboard() {
  const { authUser, loading, signInWithGoogle, signOutUser } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (!authUser) {
      router.replace("/login");
    }
  }, [authUser, router]);

  useEffect(() => {
    async function getLeaderboard() {
      if (authUser) {
        const token = await authUser.getIdToken(true)
        const response = await axios.get('/api/leaderboard', {

          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        setUsers(response.data.users)
      }
    }
    getLeaderboard()
  }, [authUser]);

  if (loading) return <LoadingPage />;

  return authUser ? (
    <div>
      <SidebarProvider>
        <UserSidebar />
        <SidebarInset>
          <Navbar />
          <main className="pt-[6rem] flex flex-col items-center justify-center ">
            <section>
              <h1 className="text-3xl md:text-5xl mb-4 ">Leaderboard</h1>
              <Separator />
              <ScrollArea className="h-[75vh] px-4 xl:w-[1000px]  lg:w-[800px] md:w-[600px] w-[80vw]">
                <LeaderboardTable users={users} />
              </ScrollArea>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ) : (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}
