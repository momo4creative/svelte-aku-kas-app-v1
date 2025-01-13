type DbParameters = {
    auth?: boolean
    register?: boolean
    login?: boolean
    logout?: boolean
    create?: boolean
    update?: boolean
    delete?: boolean
    summary?: boolean
    count?: boolean

    table?: DbTable
    body?: Record<string, any>[]
    akun?: DbFilter
    transaksi?: DbFilter
}

type DbTable = 'user' | 'akun' | 'transaksi'

type DbFilter<T = Record<string, any>> = {
    _where?: Partial<Record<keyof T, any>>
    _select?: (keyof T)[]
    _sort?: Partial<Record<keyof T, 'asc' | 'desc'>>
    _order?: [number, number]
    _date?: {
        name: keyof T
        date?: string | Date
        month?: number
        year?: number
        day?: number
        range?: (string | Date)[]
    }
}

type DbData<T> = {
    page?: number;
    limit?: number;
    count?: number;
    more?: boolean;
    data: T;
}


