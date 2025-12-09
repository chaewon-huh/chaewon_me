import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDirectory = path.join(__dirname, '../content/blog');
const outputPath = path.join(__dirname, '../app/blog-data.json');

async function processPost(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  let contentEn = content;
  let contentKo = '';
  
  if (content.includes('<!-- LANG:KO -->')) {
    const parts = content.split('<!-- LANG:KO -->');
    contentEn = parts[0].trim();
    contentKo = parts[1]?.trim() || '';
  }
  
  const processedContent = await remark()
    .use(html)
    .process(contentEn);
  const htmlContent = processedContent.toString();
  
  let htmlContentKo;
  if (contentKo) {
    const processedContentKo = await remark()
      .use(html)
      .process(contentKo);
    htmlContentKo = processedContentKo.toString();
  }
  
  return {
    slug,
    title: data.title,
    titleKo: data.titleKo,
    date: data.date,
    author: data.author,
    content: contentEn,
    contentKo: contentKo,
    htmlContent: htmlContent,
    htmlContentKo: htmlContentKo,
  };
}

async function generateBlogData() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return await processPost(slug);
      })
  );
  
  // Sort posts by date (newest first)
  posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
  
  // Create blog data object
  const blogData = {
    posts: posts.map(post => ({
      slug: post.slug,
      title: post.title,
      titleKo: post.titleKo,
      date: post.date,
      author: post.author,
    })),
    fullPosts: Object.fromEntries(
      posts.map(post => [post.slug, post])
    ),
  };
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(blogData, null, 2));
  console.log(`✅ Generated blog data with ${posts.length} posts`);
}

generateBlogData().catch(console.error);