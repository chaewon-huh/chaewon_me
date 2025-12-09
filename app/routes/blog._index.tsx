import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { getAllPosts } from "~/lib/markdown.server";

export async function loader(_: LoaderFunctionArgs) {
  const posts = getAllPosts();
  return json({ posts });
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  
  return (
    <div>
      <div className="mb-8">
        <Link to="/" className="underline hover:no-underline text-[15px]">
          ← Home
        </Link>
      </div>
      
      <h1 className="text-2xl font-semibold mb-8">Writing</h1>

      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug} className="text-[15px]">
            <Link to={`/blog/${post.slug}`} className="underline hover:no-underline">
              {post.title}
            </Link>
            <span className="text-gray-500 ml-2">— {post.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
