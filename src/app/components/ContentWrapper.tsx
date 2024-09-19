import { Container } from '@mui/material'

interface IProps {
  children: React.ReactNode
}

export const ContentWrapper = (props: IProps) => {
  const { children } = props
  return (
    <Container maxWidth="xl">
      {children}
    </Container>
  )
}
