"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"; // Adjust import path as needed
import { Badge } from "./ui/badge";
import { useAdminTickets } from "@/lib/useAdminTickets";
import { Check, Minus } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AdminTicketDialog from "./admin-ticket-dialog";

export default function AdminTicketsTable() {
  const { tickets, loading: ticketsLoading } = useAdminTickets();
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = [
    { key: "problem_type", label: "Problem Type" },
    { key: "hostel", label: "Hostel" },
    { key: "floor", label: "Floor" },
    { key: "active", label: "Active" },
    { key: "createdAt", label: "Created At" },
    { key: "userDisplayName", label: "Created By" },
    { key: "technicianDisplayName", label: "Technician" },
    { key: "resolvedAt", label: "Resolved At" },
    { key: "estimatedCost", label: "Estimated Cost" },
  ];
  // Simple global filter logic
  const filteredTickets = useMemo(() => {
    if (!globalFilter) return tickets;
    return tickets.filter(ticket =>
      columns.some(col =>
        String(ticket[col.key] ?? "")
          .toLowerCase()
          .includes(globalFilter.toLowerCase())
      )
    );
  }, [tickets, globalFilter]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Tickets</h2>
      <input
        type="text"
        placeholder="Search tickets..."
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        className="mb-4 border rounded px-2 py-1 w-full max-w-xs"
      />
      <div className="overflow-x-auto rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead key={col.key} className="px-4 py-2">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((row, idx) => (
                <Dialog key={row.id}>
                  <DialogTrigger asChild>
                    <TableRow key={row.id || idx} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                      {columns.map(col => (
                        <TableCell key={col.key} className="px-4 py-2">
                          {col.key === "active"
                            ? row.active ? <Badge variant="outline"><Check /> Active</Badge> : <Badge variant="outline"><Minus /> Archived</Badge>
                            : col.key === "problem_type" ? <Badge variant="destructive">{row.problem_type}</Badge>
                              : col.key === "hostel" ? <Badge variant="default">{row.hostel}</Badge>
                                : col.key === "createdAt" || col.key === "resolvedAt"
                                  ? row[col.key]
                                    ? row[col.key].toDate
                                      ? row[col.key].toDate().toLocaleString()
                                      : new Date(row[col.key]).toLocaleString()
                                    : ""
                                  : row[col.key] ?? ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  </DialogTrigger>
                  <AdminTicketDialog ticket={row} />
                </Dialog>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

