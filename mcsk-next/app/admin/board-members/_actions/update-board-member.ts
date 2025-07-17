'use server'

import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position is required"),
  bio: z.string().min(1, "Bio is required"),
  photo: z.string().nullable(),
  email: z.string().email("Invalid email").nullable(),
  phone: z.string().nullable(),
  linkedin_url: z.string().url("Invalid LinkedIn URL").nullable(),
  twitter_url: z.string().url("Invalid Twitter URL").nullable(),
  order: z.number().int().min(0),
  is_active: z.boolean().default(true),
})

type BoardMemberFormValues = z.infer<typeof formSchema>

export async function updateBoardMember(id: string, data: BoardMemberFormValues) {
  // TODO: Implement API call
  return null
} 