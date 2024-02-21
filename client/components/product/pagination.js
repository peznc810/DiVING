import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

export default function PaginationList() {
  return (
    <>
      <div className="container width-1200">
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{4}</Pagination.Item>
          <Pagination.Item active>{5}</Pagination.Item>
          <Pagination.Item>{6}</Pagination.Item>
          <Pagination.Item disabled>{7}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </>
  )
}
