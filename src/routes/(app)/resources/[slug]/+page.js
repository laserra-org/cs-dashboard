import { error } from '@sveltejs/kit';
import { getResource } from '$lib/api/resources';

export const ssr = false
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        const obj = await getResource({}, {'id' : params.slug});
        return {
            obj: obj,
        };
    
     } catch (e) {
            throw error(404, {
                message: 'Not found'
            });
        }
}