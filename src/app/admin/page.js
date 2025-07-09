"use client";
import Navbar from "@/components/navbar";
import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator";
import TicketCard from "@/components/ticket-card";
import LoadingPage from "@/components/loading-page";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminTicketsTable from "@/components/admin-tickets-table";
import { useAdminTickets } from "@/lib/useAdminTickets";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Inbox, LayoutGrid, Table } from "lucide-react";

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
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <Navbar />
          <main className="pt-[6rem] flex flex-col items-center justify-center w-full">
            <section>
              <h2 className="text-3xl font-semibold mb-4 flex items-center gap-4"><Inbox size={40} />Inbox</h2>
              <Tabs defaultValue="table" className="w-full">
                <span className="flex items-center">
                  <span className="flex-1">
                    <TabsList>
                      <TabsTrigger value="table"><Table /></TabsTrigger>
                      <TabsTrigger value="grid"><LayoutGrid /></TabsTrigger>
                    </TabsList>
                  </span>
                </span>
                <Separator />
                <ScrollArea className="h-[75vh] px-4">
                  <TabsContent value="table">
                    <AdminTicketsTable />
                  </TabsContent>
                  <TabsContent value="grid">
                    {loadingTickets ? "Tickets will be shown here" :
                      (tickets.map(ticket => <TicketCard key={ticket.createdAt} {...ticket} />))
                    }
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  ) : (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}
