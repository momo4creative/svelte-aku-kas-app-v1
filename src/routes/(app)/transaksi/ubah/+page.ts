import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
    const code = url.searchParams.get('code')
    if (!code) return error(404, "Code required !")
    return { code };
}) satisfies PageLoad;