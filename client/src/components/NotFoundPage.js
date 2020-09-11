import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function NotFoundPage() {
  return (
    <Container>
      <h1>404 - Not found</h1>
    </Container>
  )
}