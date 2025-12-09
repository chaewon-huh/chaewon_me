import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import { getPostBySlug } from "~/lib/markdown.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  
  const post = await getPostBySlug(slug);
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  
  return json({ post });
}

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();
  const hasKorean = post.contentKo && post.htmlContentKo;
  const [lang, setLang] = useState<'en' | 'ko'>(hasKorean ? 'ko' : 'en');

  return (
    <article>
      <div className="mb-8 flex justify-between items-center">
        <Link to="/blog" className="underline hover:no-underline text-[15px]">
          ← Writing
        </Link>
        {hasKorean && (
          <div className="text-[15px]">
            <button
              onClick={() => setLang('en')}
              className={`${lang === 'en' ? 'font-semibold' : ''} hover:opacity-70`}
            >
              EN
            </button>
            <span className="mx-2">|</span>
            <button
              onClick={() => setLang('ko')}
              className={`${lang === 'ko' ? 'font-semibold' : ''} hover:opacity-70`}
            >
              KR
            </button>
          </div>
        )}
      </div>

      <h1 className="text-2xl font-semibold mb-2">
        {post.title}
      </h1>
      <p className="text-[15px] text-gray-500 mb-8">
        {post.date}
        {post.author && <> — {post.author}</>}
      </p>

      <div 
        className="prose text-[15px] leading-[1.8]"
        dangerouslySetInnerHTML={{ 
          __html: lang === 'ko' && post.htmlContentKo ? post.htmlContentKo : post.htmlContent || '' 
        }}
      />
    </article>
  );
}