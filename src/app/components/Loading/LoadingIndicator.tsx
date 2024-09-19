import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import { Spin } from 'antd'
import React from 'react'
import { CSSProperties, FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  style?: CSSProperties
}

const LoadingIndicator: FunctionComponent<Props> = (props) => {
  const icon = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <Wrapper style={{ ...props.style }}>
      <Spin indicator={icon} style={{ marginBottom: 10 }} />
      <p>กำลังโหลดข้อมูล</p>
    </Wrapper>
  )
}

export default LoadingIndicator

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 6px;
`
