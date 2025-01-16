import Link from 'next/link'

interface TagListProps {
  tags: string[]
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link
          key={tag}
          href={`/blog/tag/${tag}`}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

