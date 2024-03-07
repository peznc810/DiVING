import React, { useEffect, useRef } from 'react'

export default function Ckeditor({ onChange, editorLoaded, name, value }) {
  const editorRef = useRef()
  const { CKEditor, ClassicEditor } = editorRef.current || {}
  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
  }, [])
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData()
            onChange(data)
          }}
          // onBlur={(event, editor) => {
          //   console.log('Blur.', editor)
          // }}
          // onFocus={(event, editor) => {
          //   console.log('Focus.', editor)
          // }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  )
}
