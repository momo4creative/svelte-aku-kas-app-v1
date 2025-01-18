import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { idSchema, parceZod } from '$lib/schema/parce-zod';
import { transaksiSchema, transformTransaksiToArrayData } from '$lib/schema/transaksi';
import db from '$lib/server/db';

export const load = (async ({ url }) => {
    const page = url.searchParams.get('p')
    const limit = url.searchParams.get('l')

    if (!page) return {
        summary_transaksi: undefined
    }

    // console.log(page, limit);

    const nPage = Number(page)
    const nLimit = Number(limit)

    const start = (nPage - 1) * nLimit
    const end = nPage * nLimit

    const summary_transaksi = db.transaksi.summary({
        transaksi: {
            _sort: { created_at: 'desc' },
            _order: [start, end]
        },
        akun: {
            _select: ['code', 'name']
        }
    })

    return {
        summary_transaksi
    };
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ request }) => {
        const zod = await parceZod(request, transaksiSchema.create)
        if (!zod.success) return fail(400, zod.error)

        const data = transformTransaksiToArrayData(zod.data)
        const res = await db.transaksi.create(data)
        if (!res.success) return fail(res.error.status ?? 400, res.error)
        return { data: res.result }
    },

    update: async ({ request }) => {
        const zod = await parceZod(request, transaksiSchema.update)
        if (!zod.success) return fail(400, zod.error)

        const data = transformTransaksiToArrayData(zod.data)
        const res = await db.transaksi.update(data)
        if (!res.success) return fail(res.error.status ?? 400, res.error)
        return { data: res.result }
    },

    delete: async ({ url }) => {
        const ids = url.searchParams.getAll('id')
        if (!ids) return fail(400, { message: 'Id kosong !' })

        const body = ids.map(id => ({ id }))
        const res = await db.transaksi.delete(body)
        if (!res.success) return fail(res.error.status ?? 400, res.error)
        return { data: res.result }
    }
} satisfies Actions;