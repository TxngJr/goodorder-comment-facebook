import { List } from '@mui/material'

interface IProps {
  children: React.ReactNode;
}

export const PropertyList = (props: IProps) => {
  const { children } = props

  return (
    <List disablePadding>
      {children}
    </List>
  )
}
