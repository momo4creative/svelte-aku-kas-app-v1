import type { ErrorZod } from "$lib/schema/parce-zod"

type Result<T> = {
    error?: ErrorZod
    result: T
}

export const aksi: {
    delete?: string[]
    name?: string
    onSuccess?: () => void
} = $state({})

export const list: {
    loading?: boolean
    akun: Result<DbData<SummaryAkun[]>>
    transaksi: Result<DbData<SummaryTransaksi[]>>
} = $state({
    akun: { result: { data: [] } },
    transaksi: { result: { data: [] } },
})