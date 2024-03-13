import React, { useEffect, useState } from 'react'
import { Badge, Col, Form, InputGroup, Row, Button } from 'react-bootstrap'
// import DiButton from './dibutton'

export default function TagGenerator({ onTagsChange }) {
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')

  const handleAddTag = (e) => {
    e.preventDefault()
    if (newTag.trim() !== '' && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag]
      setTags(updatedTags)
      onTagsChange(updatedTags)
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    onTagsChange(updatedTags)
  }

  return (
    <>
      <Row>
        <Col>
          <div className="mb-3">
            {tags.map((tag) => (
              <Badge
                // value={value}
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
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs="auto" className="my-1">
          <InputGroup className="mb-3">
            <InputGroup.Text>標籤</InputGroup.Text>
            <Form.Control
              placeholder="新增標籤..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleAddTag}
            >
              新增
            </Button>
            {/* <DiButton
                text={'新增標籤'}
                color="#ff9720"
                onClick={handleAddTag}
              /> */}
          </InputGroup>
        </Col>
      </Row>
    </>
  )
}
