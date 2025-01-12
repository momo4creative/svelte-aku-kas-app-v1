import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { idSchema, parceZod } from '$lib/schema/parce-zod';
import { akunSchema } from '$lib/schema/akun';
import db from '$lib/server/db';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ request }) => {
        const zod = await parceZod(request, akunSchema.create)
        if (!zod.success) return fail(400, zod.error)

        const res = await db.akun.create([zod.data])
        if (!res.success) return fail(res.error.status ?? 400, res.error)
        return { data: res.result[0] }
    },

    update: async ({ request }) => {
        const zod = await parceZod(request, akunSchema.update)
        if (!zod.success) return fail(400, zod.error)

        const res = await db.akun.update([zod.data])
        if (!res.success) return fail(res.error.status ?? 400, res.error)
        return { data: res.result[0] }
    },

    delete: async ({ url }) => {
        const ids = url.searchParams.getAll('id')
        if (!ids) return fail(400, { message: 'Id kosong !' })

        const body = ids.map(id => ({ id }))
        const res = await db.akun.delete(body)
        if (!res.success) return fail(res.error.status ?? 400, res.error)
        return { data: res.result }
    }
} satisfies Actions;