import type { ErrorZod, ReturnDb } from "$lib/schema/parce-zod"
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
            update(n => ({ ...n, loading: true }))
            const res = await values
            update(n => ({ ...n, loading: false }))
            if (!res.success) return update(n => ({ ...n, error: res.error }))
            update(n => ({ ...n, result: res.result }))
        }
    }
}

export const listAkun = createStore<SummaryAkun>()
export const listTransaksi = createStore<SummaryTransaksi>()