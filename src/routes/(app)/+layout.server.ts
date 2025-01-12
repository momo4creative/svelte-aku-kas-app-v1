import db from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user }, depends, url }) => {
    depends("base:layout")
    console.log('base', new Date().getSeconds());

    const monthNow = url.searchParams.get('bulan') ?? new Date().getMonth() + 1
    const yearNow = url.searchParams.get('bulan') ?? new Date().getFullYear()

    const promise_summary_akun = db.akun.summary({
        akun: {
            _sort: { code: 'asc' }
        },
        transaksi: {
            _select: ['code', 'desc', 'value'],
            _sort: { created_at: 'desc' },
            _order: [0, 5],
            _date: {
                name: 'tanggal',
                month: Number(monthNow),
                year: Number(yearNow),
            }
        }
    })

    const promise_summary_transaksi = db.transaksi.summary({
        transaksi: {
            _sort: { created_at: 'desc' },
            _order: [0, 10]
        },
        akun: {
            _select: ['code', 'name']
        }
    })


    return {
        user,
        promise_summary_akun,
        promise_summary_transaksi
    };
}) satisfies LayoutServerLoad;