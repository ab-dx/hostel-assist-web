"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export default function AdminTicketDialog({ ticket }) {



  return (

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ticket</DialogTitle>
        <DialogDescription>
          Ticket Overview
        </DialogDescription>
        <div className="flex gap-2">
          <div>
            <Label htmlFor="original-image">Original Image</Label>
            <Image id="original-image" src={ticket.image_url} alt="Image Preview" className="py-2" width={200} height={200} />
          </div>
          {
            ticket.resolved_image_url &&
            <div>
              <Label htmlFor="repaired-image">Repaired Image</Label>
              <Image id="repaired-image" src={ticket.resolved_image_url} alt="Image Preview" className="py-2" width={200} height={200} />
            </div>
          }
          {
            ticket.parts_image_url &&
            <div>
              <Label htmlFor="parts-image">Parts Image</Label>
              <Image id="parts-image" src={ticket.parts_image_url} alt="Image Preview" className="py-2" width={200} height={200} />
            </div>
          }
        </div>

        <Separator />
        <div className="flex gap-2">
          <Badge variant="destructive">{ticket.problem_type}</Badge>
          <Badge variant="default">{ticket.hostel}</Badge>
          <Badge className="bg-muted">Floor {ticket.floor}</Badge>
          <Badge variant="outline">{ticket.active ? "Active" : "Archived"}</Badge>
        </div>
        <div className="text-sm flex flex-col gap-2">
          <span>
            <span className="font-semibold">Created By:</span> {ticket.userDisplayName}
          </span>
          <span>
            <span className="font-semibold">Created At:</span> {ticket.createdAt.toDate().toLocaleString()}
          </span>
          <span>
            <span className="font-semibold">Resolved At:</span> {ticket.resolvedAt?.toDate().toLocaleString() || "-"}
          </span>
          <span>
            <span className="font-semibold">Complaint remarks:</span> <span className="text-xs">{ticket.remarks || "-"}</span>
          </span>
          <span>
            <span className="font-semibold">Assigned Technician:</span> {ticket.technicianDisplayName || "-"}
          </span>
          <span>
            <span className="font-semibold">Technician remarks:</span> <span className="text-xs">{ticket.resolved_remarks || "-"}</span>
          </span>
          <span>
            <span className="font-semibold">Estimated Cost:</span> {ticket.estimatedCost || "-"}
          </span>
        </div>

      </DialogHeader>
    </DialogContent>
  );
}
