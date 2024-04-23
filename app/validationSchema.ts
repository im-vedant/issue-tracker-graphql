import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
    id : z.number(),
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    assignedToId : z.string().min(1,"AssignedToId is required").max(255).optional().nullable(),
    status : z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional()
});
