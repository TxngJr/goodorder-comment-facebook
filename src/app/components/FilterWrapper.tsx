import React from 'react'
import { Space } from 'antd'
import styled from 'styled-components'

interface FilterWrapperProps {
  children: React.ReactNode;
  minWidth?: number;
  style?: object;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({ children, minWidth, style }) => {
  return (
    <Wrapper minWidth={minWidth} style={style}>
      <Space className="space-wrapper" direction="horizontal" align="baseline">
        {children}
      </Space>
    </Wrapper>
  )
}

export default FilterWrapper

const Wrapper = styled.div<{ minWidth?: number }>`
  display: inline-flex;
  gap: 10px;
  width: 100%;
  margin-bottom: 24px;
  @media (max-width: 1265px) {
    display: inline-block;
    overflow-x: auto;
  }

  .space-wrapper {
    min-width: ${(props) => props?.minWidth ?? '758px'};
    overflow-x: hidden;
  }
`
