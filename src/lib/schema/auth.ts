import { z } from "zod";

const schema = z.object({
    username: z.string().min(4, 'Minimal 4 karakter !').trim().toUpperCase(),
    password: z.string().min(4, 'Minimal 4 karakter !').trim()
})

const schema2 = z.object({
    confirmPassword: z.string().trim()
})

export const authSchema = {
    login: schema,
    register: schema.merge(schema2).superRefine((v, c) => {
        if (v.password != v.confirmPassword) {
            c.addIssue({
                message: "Confirm Password dan Password harus sama !",
                code: 'custom',
                path: ['confirmPassword']
            })
        }
    })
}


