import { z } from "zod";

export const userSchema = z.object({
    username    : z.string(),
    id          : z.string() 
})