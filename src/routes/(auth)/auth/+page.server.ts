import type { PageServerLoad } from './$types';
import db from '$lib/server/db';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { hash, jwt } from '$lib/server/secure';
import { parceZod } from '$lib/schema/parce-zod';
import { authSchema } from '$lib/schema/auth';

export const load = (async ({ url, cookies }) => {
    const logout = url.searchParams.has('logout')
    if (logout) {
        cookies.delete('sessionId', { path: '/' })
        db.auth.logout()
        return redirect(307, '/auth/login?msg=Anda udah logout. Silakan login kembali !&status=200')
    }

    return redirect(307, '/auth/login')
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ request, cookies }) => {
        const zod = await parceZod(request, authSchema.login)
        if (!zod.success) return fail(400, zod.error)

        const { username: usernameX, password } = zod.data

        // check user
        const user = await db.auth.login(usernameX)
        if (!user.success)
            return fail(user.error.status ?? 400, user.error)

        // check password
        const { password: hashPassword, username, session } = user.result
        const validPassword = hash.isValid(password, hashPassword)
        if (!validPassword)
            return fail(400, {
                message: "Periksa username dan password !",
                errors: undefined
            })

        db.session = session
        const token = jwt.get({ username, session })
        cookies.set('sessionId', token, { path: '/', maxAge: 60 * 60 * 24 * 5 })

        return redirect(303, '/?msg=Berhasil login&status=200')
    },

    register: async ({ request }) => {
        const zod = await parceZod(request, authSchema.register)
        if (!zod.success) return fail(400, zod.error)

        const { username } = zod.data
        const password = hash.get(zod.data.password)

        const user = await db.auth.register({ username, password })
        if (!user.success)
            return fail(user.error.status ?? 400, user.error)

        return redirect(303, '/auth/login?msg=Berhasil register. Silakan login !&status=200')
    },
} satisfies Actions