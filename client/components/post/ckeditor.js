import React, { useEffect, useRef } from 'react'

export default function CKeditor({ onChange, editorLoaded, name, value }) {
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
          data={value} //會出現在編輯器裡面的內容
          onChange={(event, editor) => {
            //變更時事件
            const data = editor.getData()
            onChange(data)
            // console.log(event)
          }}
          // onBlur={(event, editor) => {
          //   console.log('Blur.', editor)
          // }}
          // onFocus={(event, editor) => {
          //   console.log('Focus.', editor)
          // }}
          // config={{
          //   plugins: [Image],
          // }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  )
}
