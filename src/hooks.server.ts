import db from "$lib/server/db";
import { jwt } from "$lib/server/secure";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const auth: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get('sessionId')
    if (sessionId) {
        const payload = jwt.verify(sessionId)
        event.locals.user = payload
        db.session = payload?.session
    }
    return await resolve(event)
}

const guard: Handle = async ({ event, resolve }) => {
    const redirectTo = event.url.pathname
    if (!event.locals.user && !event.url.pathname.startsWith('/auth'))
        return redirect(307, '/auth/login?msg=Silakan login terlebih dahulu !&status=400&redirectTo=' + redirectTo)

    if (event.locals.user && event.url.pathname.startsWith('/auth/login'))
        return redirect(307, '/?msg=Sudah login !')
    return await resolve(event)
}

export const handle: Handle = sequence(auth, guard)