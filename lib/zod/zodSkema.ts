import { z } from "zod";

//@/create/route.ts (POST)
export const createClassSchema = z.object({
  class_name: z.string().min(1, "Class name is required"),
  category: z.string().min(1, "Category is required"),
  capacity: z.number().int().positive("Capacity must be a positive number"),
  scheduled_on: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid scheduled date"
  }),
  time: z.string().min(1, "Start time is required"),
  coach_id: z.uuid("Invalid coach ID")
});

//@/update/route.ts (PATCH)
export const updateClassSchema = createClassSchema.partial().extend({
  class_id: z.uuid({ message: 'Invalid class_id' }),
  is_active: z.boolean().optional()
});

export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
