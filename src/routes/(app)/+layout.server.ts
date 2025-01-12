import db from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { user }, depends, url }) => {
    depends("base:layout")
    console.log('base', new Date().getSeconds());

    const bulan = url.searchParams.get('bulan') ?? new Date().getMonth() + 1
    const tahun = url.searchParams.get('tahun') ?? new Date().getFullYear()

    const promise_summary_akun = db.akun.summary({
        akun: {
            _sort: { code: 'asc' }
        },
        transaksi: {
            _select: ['code', 'desc', 'value', 'tanggal'],
            _sort: { created_at: 'desc' },
            _order: [0, 5],
            _date: {
                name: 'tanggal',
                month: Number(bulan),
                year: Number(tahun),
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
        promise_summary_transaksi,
        bulan: Number(bulan),
        tahun: Number(tahun)
    };
}) satisfies LayoutServerLoad;