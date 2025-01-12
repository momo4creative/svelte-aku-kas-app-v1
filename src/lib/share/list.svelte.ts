import type { ErrorZod } from "$lib/schema/parce-zod"

type Result<T> = {
    error?: ErrorZod
    result: T
}

export const list: {
    loading?: boolean
    akun: Result<DbData<SummaryAkun[]>>
    transaksi: Result<DbData<SummaryTransaksi[]>>
    aksi: {
        delete?: string[]
        name?: string
    }
} = $state({
    akun: { result: { data: [] } },
    transaksi: { result: { data: [] } },
    aksi: {}
})