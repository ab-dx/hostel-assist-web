import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Trash, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useAuth } from "@/context/AuthUserContext";
import { resolutionSchema } from "@/lib/schemas";

export default function ResolveDialog({ ticketId }) {
  const [resolvedImage, setResolvedImage] = useState(null);
  const [partsImage, setPartsImage] = useState(null);
  const [remarks, setRemarks] = useState('')
  const { authUser } = useAuth()
  const resolvedFileInputRef = useRef(null);
  const partsFileInputRef = useRef(null);
  const handleResolvedUploadButtonClick = () => {
    resolvedFileInputRef.current?.click();
  };
  const handlePartsUploadButtonClick = () => {
    partsFileInputRef.current?.click();
  };


  const handleResolvedImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file)
      // setSelectedImage(url);
      const reader = new FileReader()
      reader.onload = (event) => {
        setResolvedImage(event.target.result)
        //AIAutocomplete(event.target.result)
      }
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };
  const handlePartsImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file)
      // setSelectedImage(url);
      const reader = new FileReader()
      reader.onload = (event) => {
        setPartsImage(event.target.result)
        //AIAutocomplete(event.target.result)
      }
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const closeTicket = async () => {
    const payload =
    {
      remarks: remarks,
      resolved_image_url: resolvedImage,
      parts_image_url: partsImage,
      id: ticketId
    };
    console.log(payload)
    const parsed = resolutionSchema.parse(payload)
    if (!parsed) {
      alert("Invalid response")
      return
    }
    try {
      const token = await authUser.getIdToken(true);
      const response = await axios.post('/api/close_ticket', parsed,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (e) {
      return console.error(e)
    }
    setResolvedImage('')
    setPartsImage('')
    setRemarks('')
  }

  useEffect(() => {
    setRemarks('')
  }, [resolvedImage])

  return (

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Resolve Ticket</DialogTitle>
        <DialogDescription>
          Resolve a complaint
        </DialogDescription>
        {resolvedImage && (<>
          <Image src={resolvedImage} alt="Image Preview" className="" width={200} height={200} />
          <Button className="w-[2.5rem] translate-y-[-3rem] mx-2 z-[5000] rounded-full border" onClick={() => { setResolvedImage(null) }}><Trash /></Button>
          {partsImage && (<>

            <Image src={partsImage} alt="Image Preview" className="" width={200} height={200} />
            <Button className="w-[2.5rem] translate-y-[-3rem] mx-2 z-[5000] rounded-full border" onClick={() => { setPartsImage(null) }}><Trash /></Button>
          </>)}
          {!partsImage && <>
            <input
              type="file"
              accept="image/*"
              ref={partsFileInputRef}
              onChange={handlePartsImageChange}
              style={{ display: "none" }}
            />
            <Button variant="outline" onClick={handlePartsUploadButtonClick}>Upload Parts Image <Upload /></Button>
          </>}
          <Separator className="mb-4" />
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea onChange={e => setRemarks(e.target.value)} value={remarks} id="remarks" placeholder="Enter remarks..." />
          <Button onClick={closeTicket}>Close Ticket</Button>
        </>
        )}
        {!resolvedImage && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={resolvedFileInputRef}
              onChange={handleResolvedImageChange}
              style={{ display: "none" }}
            />
            <Button variant="outline" onClick={handleResolvedUploadButtonClick}>Upload Image<Upload /></Button>
          </>
        )
        }
      </DialogHeader>
    </DialogContent>
  );
}
