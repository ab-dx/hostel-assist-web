"use client";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, ChevronsUpDown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button";
import { Trash, Upload } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import axios from "axios";
import { useAuth } from "@/context/AuthUserContext";
import { DialogClose } from "@radix-ui/react-dialog";
import { complaintSchema } from "@/lib/schemas";

export default function TicketDialog() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hostelPopoverOpen, setHostelPopoverOpen] = useState(false);
  const [hostelValue, setHostelValue] = useState('')
  const [problemTypePopoverOpen, setProblemTypePopoverOpen] = useState(false);
  const [problemTypeValue, setProblemTypeValue] = useState('')
  const [remarks, setRemarks] = useState('')
  const [floor, setFloor] = useState('')
  const [autocompleteLoading, setAutocompleteLoading] = useState(false)
  const { authUser } = useAuth()
  const fileInputRef = useRef(null);
  const hostels = [
    "CV Raman", "Aryabhatta", "Kalam", "Asima"
  ]
  const problem_type = ["Plumbing", "Electrical", "Carpentry", "Sanitary", "Housekeeping", "Structural", "Safety"]

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const AIAutocomplete = async (url) => {
    setAutocompleteLoading(true)
    const token = await authUser.getIdToken(true);
    const response = await axios.post("/api/autocomplete",
      {
        image_url: url
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    setAutocompleteLoading(false)
    try {
      const result = JSON.parse(response.data.text)
      setProblemTypeValue(result.problem_type)
      setRemarks(result.remarks)
      return result
    } catch (e) {
      console.error(e)
    }
    return null;
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file)
      // setSelectedImage(url);
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target.result)
        AIAutocomplete(event.target.result)
      }
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const submitTicket = async () => {
    const payload =
    {
      floor: parseInt(floor),
      remarks: remarks,
      hostel: hostelValue,
      problem_type: problemTypeValue,
      image_url: selectedImage
    };
    const parsed = complaintSchema.parse(payload)
    if (!parsed) {
      alert("Invalid response")
      return
    }
    try {
      const token = await authUser.getIdToken(true);
      const response = await axios.post('/api/submit_ticket', parsed,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
    } catch (e) {
      return console.error(e)
    }
    setSelectedImage('')
    setHostelValue('')
    setFloor('')
    setProblemTypeValue('')
    setRemarks('')
  }

  useEffect(() => {
    setHostelValue('')
    setFloor('')
    setProblemTypeValue('')
    setRemarks('')
  }, [selectedImage])

  return (

    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Ticket</DialogTitle>
        <DialogDescription>
          Lodge a complaint
        </DialogDescription>
        {selectedImage && (<>
          <Image src={selectedImage} alt="Image Preview" className="" width={200} height={200} />
          <Button className="w-[2.5rem] translate-y-[-3rem] mx-2 z-[5000] rounded-full border" onClick={() => { setSelectedImage(null) }}><Trash /></Button>
          <span className="text-xs">
            Location
          </span>
          <Separator />
          <Label htmlFor="hostel">Hostel</Label>
          <Popover id="hostel" open={hostelPopoverOpen} onOpenChange={setHostelPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {hostelValue
                  ? hostels.find((hostel) => hostel.toLowerCase() === hostelValue.toLowerCase())
                  : "Select Hostel..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search hostel..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No hostel found.</CommandEmpty>
                  <CommandGroup>
                    {hostels.map((hostel) => (
                      <CommandItem
                        key={hostel}
                        value={hostel}
                        onSelect={(currentValue) => {
                          setHostelValue(currentValue === hostelValue ? "" : currentValue)
                          setHostelPopoverOpen(false)
                        }}
                      >
                        {hostel}
                        <Check
                          className={cn(
                            "ml-auto",
                            hostelValue === hostel ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>


          <Label htmlFor="floor">Floor</Label>
          <Input type="number" placeholder="Enter floor number...." className="w-50" value={floor} onChange={e => setFloor(e.target.value)} min={0} max={10} />


          <span className="text-xs flex items-center">
            <span className="flex-1">
              Details
            </span>
            {autocompleteLoading ? (
              <span className="text-xs">Loading AI-generated summary....</span>
            ) : (
              <Button variant="outline" onClick={() => AIAutocomplete(selectedImage)}>
                <Sparkles className="w-4" />
              </Button>
            )}
          </span>
          <Separator />


          <Label htmlFor="problem_type">Problem Type</Label>
          <Popover id="problem_type" open={problemTypePopoverOpen} onOpenChange={setProblemTypePopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {problemTypeValue
                  ? problem_type.find((problem) => problem.toLowerCase() === problemTypeValue.toLowerCase())
                  : "Select Problem Type..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search problem..." className="h-9" />
                <CommandList>
                  <CommandEmpty>Not found.</CommandEmpty>
                  <CommandGroup>
                    {problem_type.map((problem) => (
                      <CommandItem
                        key={problem}
                        value={problem}
                        onSelect={(currentValue) => {
                          setProblemTypeValue(currentValue === problemTypeValue ? "" : currentValue)
                          setProblemTypePopoverOpen(false)
                        }}
                      >
                        {problem}
                        <Check
                          className={cn(
                            "ml-auto",
                            problemTypeValue === problem ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>


          <Label htmlFor="remarks">Remarks</Label>
          <Textarea onChange={e => setRemarks(e.target.value)} value={remarks} id="remarks" placeholder="Enter remarks..." />
          <Button onClick={submitTicket}>Submit Ticket</Button>
        </>
        )}
        {!selectedImage && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <Button variant="outline" onClick={handleUploadButtonClick}>Upload Image<Upload /></Button>
          </>
        )
        }
      </DialogHeader>
    </DialogContent>
  );
}
