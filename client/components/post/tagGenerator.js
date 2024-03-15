import React, { useEffect, useState } from 'react'
import { Badge, Col, Form, InputGroup, Row, Button } from 'react-bootstrap'

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
                key={tag}
                pill
                bg="primary"
                className="me-1 p-2"
                onClick={() => handleRemoveTag(tag)}
                style={{ fontSize: 14 }}
                title="點按即可移除"
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
              placeholder="新增標籤... "
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
          </InputGroup>
        </Col>
      </Row>
    </>
  )
}
