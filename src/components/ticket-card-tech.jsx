import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ResolveDialog from "./resolve-dialog";

export default function TicketCardTech({ problem_type, remarks, image_url, createdAt, floor, hostel, active, ticketId }) {
  return (
    <Card className="my-4 flex flex-row hover:shadow-xl transition hover:translate-y-[-5px]">
      <div className="flex flex-col gap-2 flex-1">
        <CardHeader className="flex-1">
          <CardTitle>{problem_type}</CardTitle>
          <CardDescription>{remarks}</CardDescription>
          {/*}<CardAction>Card Action</CardAction>*/}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-min my-2">
                Resolve
              </Button>
            </DialogTrigger>
            <ResolveDialog ticketId={ticketId} />
          </Dialog>
        </CardHeader>
        <div className="flex">
          <CardContent className="flex gap-2">
            <Badge variant="default">{hostel}</Badge>
            <Badge variant="secondary">Floor {floor}</Badge>
            <Badge variant="outline">{active ? "Active" : "Archived"}</Badge>
          </CardContent>
          <CardFooter className="text-xs">
            <p>{createdAt.toDate().toLocaleString()}</p>
          </CardFooter>
        </div>
      </div>
      <div>
        <Image src={image_url} width={200} height={200} alt="Image" className="p-2 rounded-xl" />
      </div>
    </Card>
  );
}
