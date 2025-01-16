import { Navbar } from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import { TagList } from '../../../components/TagList'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostData, getSortedPostsData } from '../../../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Comments } from '../../../components/Comments'
import { ShareButtons } from '../../../components/ShareButtons'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getPostData(params.id)

  if (!post) {
    notFound()
  }

  const relatedPosts = getSortedPostsData()
    .filter(p => p.id !== params.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 2)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">{post.title}</h1>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
              <span>{format(new Date(post.date), 'PPP', { locale: zhCN })}</span>
            </div>
            <TagList tags={post.tags} />
            <ShareButtons url={`https://yourblog.com/blog/${params.id}`} title={post.title} />
            <div className="mt-6 prose dark:prose-invert lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </article>

        <Comments postId={params.id} />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">相关文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                <Link href={`/blog/${relatedPost.id}`} className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  {relatedPost.title}
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {format(new Date(relatedPost.date), 'PPP', { locale: zhCN })}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

