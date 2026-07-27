import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const data = posts.map(post => ({
    id: post.id,
    slug: post.slug,
    data: post.data,
    body: post.body,
  }));
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
};
