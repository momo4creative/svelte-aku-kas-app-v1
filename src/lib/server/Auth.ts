import type { Database } from "./db";

export class Auth<TyData extends Record<string, any>> {
    constructor(private db: Database) { }

    async register(body: Omit<TyData, 'id' | 'user_id' | 'created_at'>) {
        this.db.params = { auth: true, register: true, body: [body] }
        return this.db.fetching<TyData>()
    }

    async login(username: string) {
        this.db.params = { auth: true, login: true, body: [{ username }] }
        return this.db.fetching<Required<TyData>>()
    }

    async logout() {
        this.db.session = undefined
        // this.db.params = { auth: true, login: true, body: [{ username }] }
        // return this.db.fetching<Required<TyData>>()
    }
}