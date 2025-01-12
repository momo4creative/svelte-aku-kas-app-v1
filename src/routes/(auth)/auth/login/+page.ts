import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
    const message = url.searchParams.get('msg')
    const status = url.searchParams.get('status')
    return { message, status: status ? Number(status) : undefined };
}) satisfies PageLoad;