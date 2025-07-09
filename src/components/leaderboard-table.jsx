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
import { CircleCheck, CircleMinus } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AdminTicketDialog from "./admin-ticket-dialog";

export default function LeaderboardTable({ users }) {

  const columns = [
    { key: "index", label: "Position" },
    { key: "displayName", label: "Name" },
    { key: "points", label: "Points" },
  ];

  return (
    <div className="py-4">
      <div className="overflow-x-auto rounded border">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              {columns.map(col => (
                <TableHead key={col.key} className="px-4 py-2">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, idx) => <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{user.displayName}</TableCell>
              <TableCell>{user.points}</TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

