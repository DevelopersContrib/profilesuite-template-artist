import {  getBlogs } from '@/lib/data';

export const GET = async (request) => {
    
    const blogs = await getBlogs();
    
    return new Response(JSON.stringify({status:true, blogs:blogs.data}), { status: 201 })
}