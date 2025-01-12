import { z } from "zod";

export const idSchema = z.object({
    id: z.string().uuid()
})

export type ErrorZod<T extends z.ZodType = z.ZodAny> = {
    message?: string
    status?: number
    errors?: z.inferFlattenedErrors<T>['fieldErrors']
}

export const parceZod = async<T extends z.ZodType>(request: Request, schema: T): Promise<{
    error: Prettify<ErrorZod<T>>
    success: false
} | {
    success: true
    data: Prettify<z.infer<T>>
}> => {
    const form = Object.fromEntries(await request.formData())
    console.log({ form });

    const res = schema.safeParse(form)
    if (!res.success) return {
        error: {
            message: 'Kesalahan validasi form !',
            status: 400,
            errors: res.error.flatten().fieldErrors
        },
        success: false
    }
    return {
        success: true,
        data: res.data
    }
}