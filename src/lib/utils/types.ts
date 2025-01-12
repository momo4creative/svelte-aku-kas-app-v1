type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

type Payload = Prettify<Pick<Required<User>, 'username' | 'session'>>

type User = {
    id: string
    username: string
    password: string
    session?: string
    created_at: string | Date
}

type Akun = {
    id: string
    user_id: string
    code: number
    name: string
    limit: number
    created_at: string | Date
    updated_at?: string | Date
}

type SummaryAkun = Prettify<Akun & { value: number; transaksi: Transaksi[] }>

type Transaksi = {
    id: string
    user_id: string
    akun_id: string
    tanggal: string | Date
    code: string
    desc: string
    value: number
    created_at: string | Date
    updated_at?: string | Date
}

type SummaryTransaksi = {
    code: string
    data: Array<Transaksi & { akun: Akun }>
}