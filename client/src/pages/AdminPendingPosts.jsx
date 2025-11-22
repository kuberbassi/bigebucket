import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { approvePost, rejectPost } from '../store/blogSlice'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'

const AdminPendingPosts = () => {
  const posts = useSelector(s => s.blogs?.posts || [])
  const pending = posts.filter(p => p.status === 'pending' || p.approved === false)
  const dispatch = useDispatch()

  const handleApprove = async (id) => {
    try {
      // attempt server-side approval (if endpoint exists)
      try {
        await Axios({ url: '/api/admin/blogs/approve', method: 'post', data: { id } })
      } catch (e) {
        // ignore, do local update
      }
      dispatch(approvePost(id))
    } catch (e) {
      console.error(e)
      alert('Failed to approve')
    }
  }

  const handleReject = async (id) => {
    try {
      try {
        await Axios({ url: '/api/admin/blogs/reject', method: 'post', data: { id } })
      } catch (e) {
        // ignore
      }
      dispatch(rejectPost(id))
    } catch (e) {
      console.error(e)
      alert('Failed to reject')
    }
  }

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <h2 className="text-2xl font-semibold mb-4">Pending Blog Posts</h2>
      {pending.length === 0 ? (
        <div className="text-gray-600">No pending posts</div>
      ) : (
        <div className="space-y-4">
          {pending.map(p => (
            <div key={p.id} className="p-4 border rounded flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold">{p.title}</div>
                <div className="text-sm text-gray-600">{p.excerpt}</div>
                <div className="text-xs text-gray-500 mt-1">By {p.author} • {new Date(p.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleApprove(p.id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                <button onClick={() => handleReject(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminPendingPosts
