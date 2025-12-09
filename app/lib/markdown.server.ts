// Import pre-generated blog data
import blogData from '../blog-data.json';

export interface Post {
  slug: string;
  title: string;
  titleKo?: string;
  date: string;
  author?: string;
  content: string;
  contentKo?: string;
  htmlContent?: string;
  htmlContentKo?: string;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = blogData.fullPosts[slug];
  return post || null;
}

export function getAllPosts(): Post[] {
  return blogData.posts;
}

export function getAllPostSlugs() {
  return blogData.posts.map(post => ({
    slug: post.slug,
  }));
}