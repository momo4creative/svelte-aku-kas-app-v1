import { goto } from "$app/navigation"
import type { ErrorZod } from "$lib/schema/parce-zod"
import type { ActionResult } from "@sveltejs/kit"
import { z } from "zod"

type ReturnSubmit = {
    result: ActionResult
    formElement: HTMLFormElement
}

export type CallbackSubmit<S extends Record<string, any> = Record<string, any>, F extends z.ZodType = z.ZodAny> = {
    loading?: (arg: boolean) => void
    success?: (arg: { data: S }) => void
    failure?: (arg: ErrorZod<F>) => void
}

export const handleSubmit = <S extends Record<string, any>, F extends z.ZodType>(title: string, callback: CallbackSubmit<S, F>) => {
    callback.loading?.(true)
    console.log(title);

    return async ({ result, formElement }: ReturnSubmit) => {
        callback.loading?.(false)
        console.log({ result });

        if (result.type == 'success') {
            formElement.reset()
            return callback.success?.(result.data as { data: S })
        }

        if (result.type == 'failure') {
            if (result.status == 401) goto("/auth/login?msg=Session habis. Silakan login kembali !")
            return callback.failure?.(result.data as ErrorZod<F>)
        }

        if (result.type == 'redirect') {
            return goto(result.location)
        }

        if (result.type == 'error') {

        }
    }
}