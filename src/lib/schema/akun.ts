import { z } from "zod";
import { idSchema } from "./parce-zod";

const schema = z.object({
    code: z.string().pipe(z.coerce.number()).refine(v => v.toString().length == 4, 'Harus 4 karakter !'),
    name: z.string().min(3, "Minimal 3 karakter !").trim(),
    limit: z.string().optional().pipe(z.coerce.number())
})

export const akunSchema = {
    create: schema,
    update: schema.merge(idSchema)
}


