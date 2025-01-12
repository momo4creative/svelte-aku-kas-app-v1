import { z } from "zod";
import { idSchema } from "./parce-zod";

const schema = z.object({
    akun_id0: z.string().uuid("Pilih salah satu !"),
    akun_id1: z.string().uuid("Pilih salah satu !"),
    tanggal: z.string().min(1, "Tanggal salah !").pipe(z.coerce.date()),
    code: z.string().min(1, "Wajib diisi !"),
    desc: z.string().min(3, "Minimal 3 karakter !").trim(),
    value: z.string().pipe(z.coerce.number().min(1, "Wajib diisi !")),
})

export const transaksiSchema = {
    create: schema,
    update: schema.merge(z.object({
        id0: z.string().uuid(),
        id1: z.string().uuid(),
    }))
}

export const transformTransaksiToArrayData = (v: any) => {
    let data: Transaksi[] = []
    const { akun_id0, akun_id1, id0, id1, value, ...rest } = v
    data.push({
        id: id0,
        akun_id: akun_id0,
        value: -value,
        ...rest
    })
    data.push({
        id: id1,
        akun_id: akun_id1,
        value: value,
        ...rest
    })
    return data
}


