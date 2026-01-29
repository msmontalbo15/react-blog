import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { JSX } from 'react'

interface Blog {
  id: string
  title: string
  content: string
  image_url: string | null
  created_at: string
}

const PAGE_SIZE = 5

export function BlogListPage(): JSX.Element {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [page, setPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchBlogs()
  }, [page])

  const fetchBlogs = async () => {
    setLoading(true)

    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error && data) {
      setBlogs(data)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Blogs</h1>

      {blogs.map(blog => (
        <div key={blog.id} className="border p-4 rounded">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600">
            {blog.content.substring(0, 120)}...
          </p>
          <Link to={`/blogs/${blog.id}`} className="text-blue-600">
            Read more
          </Link>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
          className="border px-4 py-2 rounded"
        >
          Prev
        </button>

        <button
          onClick={() => setPage(p => p + 1)}
          className="border px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      {loading && <p>Loading...</p>}
    </div>
  )
}
