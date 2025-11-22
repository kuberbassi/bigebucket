import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../store/blogSlice'

const BlogEdit = () => {
  const { id } = useParams()
  const posts = useSelector(s => s.blogs?.posts || [])
  const post = posts.find(p => p.id === id)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if (post) {
      setTitle(post.title || '')
      setExcerpt(post.excerpt || '')
      setContent(post.content || '')
      setTags((post.tags||[]).join(', '))
    }
  }, [post])

  if (!post) return <div className="max-w-3xl mx-auto my-8 px-4">Post not found</div>

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updatePost({ id: post.id, title: title.trim(), excerpt: excerpt.trim(), content, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) }))
    navigate('/blog')
  }

  return (
    <div className="max-w-3xl mx-auto my-8 px-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Excerpt</label>
          <input value={excerpt} onChange={e=>setExcerpt(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea value={content} onChange={e=>setContent(e.target.value)} rows={10} className="w-full px-3 py-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input value={tags} onChange={e=>setTags(e.target.value)} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
          <button type="button" onClick={()=>navigate('/blog')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default BlogEdit
