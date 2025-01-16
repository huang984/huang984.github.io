import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { TagList } from '../components/TagList'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import Image from 'next/image'
import { PersonalInfo } from '../components/PersonalInfo'

export default function Home() {
  const allPosts = getSortedPostsData()
  const featuredPost = allPosts[0]
  const latestPosts = allPosts.slice(1, 4)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto mt-8 px-4 flex-grow">
        <PersonalInfo />
        {featuredPost ? (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">特色文章</h2>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src="/placeholder.svg"
                    alt="Featured post"
                    width={300}
                    height={200}
                    className="h-48 w-full object-cover md:w-48"
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">特色</div>
                  <Link href={`/blog/${featuredPost.id}`} className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white hover:underline">
                    {featuredPost.title}
                  </Link>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(featuredPost.date), { addSuffix: true, locale: zhCN })}
                  </p>
                  <div className="mt-4">
                    <TagList tags={featuredPost.tags} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">欢迎来到我的博客</h2>
            <p className="text-gray-600 dark:text-gray-400">目前还没有文章，请稍后再来查看！</p>
          </section>
        )}

        {latestPosts.length > 0 ? (
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">最新文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map(post => (
                <div key={post.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      <Link href={`/blog/${post.id}`} className="text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {formatDistanceToNow(new Date(post.date), { addSuffix: true, locale: zhCN })}
                    </p>
                    <TagList tags={post.tags} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="bg-indigo-100 dark:bg-indigo-900 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">订阅我的博客</h2>
          <form className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="输入您的邮箱地址"
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
              required
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              订阅
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}

