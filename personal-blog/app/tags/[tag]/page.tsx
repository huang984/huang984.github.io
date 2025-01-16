import { Navbar } from '../../../components/Navbar'
import { Footer } from '../../../components/Footer'
import Link from 'next/link'
import { getAllTags, getPostsByTag } from '../../../lib/posts'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <h1 className="text-4xl font-bold mb-8">标签: {params.tag}</h1>
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white shadow-md rounded-lg p-6">
              <Link href={`/blog/${post.id}`} className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                {post.title}
              </Link>
              <p className="text-gray-500 text-sm mt-1">
                {format(new Date(post.date), 'PPP', { locale: zhCN })}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

