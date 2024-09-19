import * as React from 'react'
import styled from 'styled-components'

export const NotFound = () => {
  return (
    <Wrapper>
      <p style={{ marginBottom: 0 }}>
        4
        <span role="img" aria-label="Crying Face">
          😢
        </span>
        4
      </p>
      <p>Page not found.</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  font-weight: bold;
  font-size: 3.375rem;

  span {
    font-size: 3.125rem;
  }
`
