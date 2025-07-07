"use client";
import Navbar from "@/components/navbar";
import { useAuth } from "../../context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

export default function Home() {
  const { authUser, loading, signInWithGoogle, signOutUser } = useAuth();
  const router = useRouter();
  const { tickets, loading: loadingTickets } = useUserTickets();
  useEffect(() => console.log(tickets), [loadingTickets])

  useEffect(() => {
    if (!authUser) {
      router.replace("/login");
    }
  }, [authUser, router]);

  if (loading) return <LoadingPage />;

  return authUser ? (
    <div>
      <Navbar />
      <main className="pt-[6rem] flex flex-col items-center justify-center ">
        <section>
          <h1 className="text-3xl md:text-5xl mb-4 ">My Tickets</h1>
          <Tabs defaultValue="active" className="xl:w-[1000px]  lg:w-[800px] md:w-[600px] w-[80vw]">
            <span className="flex items-center">
              <span className="flex-1">
                <TabsList>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="archive">Archive</TabsTrigger>
                </TabsList>
              </span>
              <Dialog>
                <DialogTrigger asChild><Button className="flex">
                  New
                  <Plus />
                </Button></DialogTrigger>
                <TicketDialog />
              </Dialog>
            </span>
            <Separator />
            <ScrollArea className="h-[75vh] px-4">
              <TabsContent value="active">
                {loadingTickets ? "Active Tickets will be shown here" :
                  (tickets.filter(ticket => ticket.active).length > 0) ?
                    (tickets.filter(ticket => ticket.active).map(ticket => <TicketCard key={ticket.createdAt} {...ticket} />))
                    : ("No active tickets")
                }
              </TabsContent>
              <TabsContent value="archive">
                {loadingTickets ? "Archived Tickets will be shown here" :
                  (tickets.filter(ticket => !ticket.active).length > 0) ?
                    (tickets.filter(ticket => !ticket.active).map(ticket => <TicketCard key={ticket.createdAt} {...ticket} />))
                    : ("No archived tickets")
                }
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </section>
      </main>
    </div>
  ) : (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}
