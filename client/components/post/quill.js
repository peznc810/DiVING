import React from 'react'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import dynamic from 'next/dynamic'
const QuillEditor = dynamic(() => import('react-quill'), { ssr: false })

export default function Quill() {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['code-block'],
      ['clean'],
    ],
  }

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ]

  return (
    <>
      <QuillEditor modules={quillModules} formats={quillFormats} />
    </>
  )
}
