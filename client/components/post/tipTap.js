'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export default function Tiptap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <>
      <EditorContent
        editor={editor}
        onChange={(event, editor) => {
          const data = editor.getJSON()
        }}
      />
      
    </>
  )
}
