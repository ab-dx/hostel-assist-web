import { z } from "zod";

export const complaintSchema = z.object({
  problem_type: z.string(),
  remarks: z.string(),
  floor: z.number().min(0).max(10),
  hostel: z.string(),
  image_url: z.string()
});

export const resolutionSchema = z.object({
  remarks: z.string(),
  resolved_image_url: z.string(),
  parts_image_url: z.string().optional(),
  id: z.string()
})
