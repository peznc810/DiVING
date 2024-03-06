import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PostCreate() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const addPost = async (e) => {
    e.preventDefault()
    if (title != '' && body != '') {
      const formData = {
        title: title,
        content: body,
      }
      const add = await fetch('/api/post/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const content = await add.json()
      if (content.success > 0) {
        router.push('/post')
      }
    }
  }
  return (
    <form className="w-full" onSubmit={addPost}>
      <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
        Form Add
      </span>
      <div className="w-full py-2">
        <h3>Title</h3>
        <input
          type="text"
          name="title"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full py-2">
        <h3>Content</h3>
        <textarea
          name="title"
          className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div className="w-full py-2">
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">
          Submit
        </button>
      </div>
    </form>
  )
}
