import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import Link from 'next/link'
import { getAllTags, getPostsByTag } from '../../lib/posts'

export default function Tags() {
  const tags = getAllTags()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <h1 className="text-4xl font-bold mb-8">标签</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map(tag => {
            const posts = getPostsByTag(tag)
            return (
              <div key={tag} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">{tag}</h2>
                <p className="text-gray-600 mb-4">共 {posts.length} 篇文章</p>
                <Link href={`/tags/${tag}`} className="text-indigo-600 hover:underline">
                  查看所有文章
                </Link>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}

