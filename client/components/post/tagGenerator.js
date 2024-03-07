import React, { useState } from 'react'
import { Badge, Form } from 'react-bootstrap'
import DiButton from './dibutton'

export default function TagGenerator() {
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
  }

  return (
    <>
      <div className="mb-3">
        {tags.map((tag) => (
          <Badge
            value={tag}
            key={tag}
            pill
            bg="primary"
            className="mr-2"
            onClick={() => handleRemoveTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Form.Control
        type="text"
        placeholder="新增標籤..."
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
      />
      <DiButton text={'新增標籤'} color="#ff9720" onClick={handleAddTag} />
    </>
  )
}
