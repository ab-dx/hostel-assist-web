"use client";
import Navbar from "@/components/navbar";
import { useAuth } from "../../context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";
import TicketCard from "@/components/ticket-card";
import LoadingPage from "@/components/loading-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminTicketsTable from "@/components/admin-tickets-table";
import { useAdminTickets } from "@/lib/useAdminTickets";

export default function Admin() {
  const { authUser, loading, signInWithGoogle, signOutUser } = useAuth();
  const router = useRouter();
  const { tickets, loading: loadingTickets } = useAdminTickets();
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
          <Tabs defaultValue="inbox" className="w-full">
            <span className="flex items-center">
              <span className="flex-1">
                <TabsList>
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="archive">Archive</TabsTrigger>
                </TabsList>
              </span>
            </span>
            <Separator />
            <ScrollArea className="h-[75vh] px-4">
              <TabsContent value="inbox">
                <AdminTicketsTable />
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
