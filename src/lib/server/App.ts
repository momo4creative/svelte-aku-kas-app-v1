import type { Database } from "./db";

export class App<TyData extends Record<string, any>, TySummary> {
    constructor(private table: DbTable, private db: Database) { }

    async create(body: Prettify<Omit<TyData, 'id' | 'user_id' | 'created_at'>>[]) {
        this.db.params = { create: true, table: this.table, body }
        return this.db.fetching<TyData[]>()
    }

    async update(body: Omit<TyData, 'user_id' | 'created_at'>[]) {
        this.db.params = { update: true, table: this.table, body }
        return this.db.fetching<TyData[]>()
    }

    async delete(body: { id: string }[]) {
        this.db.params = { delete: true, table: this.table, body }
        return this.db.fetching<boolean>()
    }

    async count() {
        this.db.params = { count: true, table: this.table }
        return this.db.fetching<number>()
    }

    async summary(filter: { akun?: DbFilter<Akun>, transaksi?: DbFilter<Transaksi> } | undefined = undefined) {
        this.db.params = { summary: true, table: this.table, akun: filter?.akun, transaksi: filter?.transaksi }
        return this.db.fetching<DbData<TySummary[]>>()
    }
}