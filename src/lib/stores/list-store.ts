import type { ErrorZod, ReturnDb } from "$lib/schema/parce-zod"
import { aksi } from "$lib/share/list.svelte"
import { writable } from "svelte/store"

type Store<T> = {
    loading?: boolean
    error?: ErrorZod
    result: DbData<T[]>
}

const createStore = <T>() => {
    const { subscribe, set, update } = writable<Store<T>>({ result: { data: [] } })

    return {
        subscribe,
        init: async (values: Promise<ReturnDb<DbData<T[]>>>) => {
            aksi.loading = true
            const res = await values
            aksi.loading = false
            if (!res.success) return update(n => ({ ...n, error: res.error }))
            update(n => ({ ...n, result: res.result }))
        },

        addMore: async (values: Promise<ReturnDb<DbData<T[]>>> | undefined) => {
            if (!values) return

            aksi.loading = true
            const res = await values
            aksi.loading = false
            if (!res.success) return update(n => ({ ...n, error: res.error }))

            const { data, ...info } = res.result

            update(n => {
                n.result = { ...n.result, ...info }
                n.result.data = [...n.result.data, ...data]
                return n
            })
        }
    }
}

export const listAkun = createStore<SummaryAkun>()
export const listTransaksi = createStore<SummaryTransaksi>()