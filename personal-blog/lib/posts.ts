import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory does not exist. Creating it now.')
    fs.mkdirSync(postsDirectory)
    return []
  }

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string; tags: string[] })
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory does not exist. Creating it now.')
    fs.mkdirSync(postsDirectory)
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  
  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; tags: string[] })
  }
}

export function getAllTags() {
  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory does not exist. Creating it now.')
    fs.mkdirSync(postsDirectory)
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allTags = fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    return matterResult.data.tags as string[]
  })
  return Array.from(new Set(allTags.flat()))
}

export function getPostsByTag(tag: string) {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => post.tags.includes(tag))
}

