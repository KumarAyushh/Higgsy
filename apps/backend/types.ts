import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(4),
});

export const CreateAvatarSchema = z.object({
    name: z.string(),
    image: z.string()
})