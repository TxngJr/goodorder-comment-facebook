import { Box, ListItem, ListItemText, Typography } from '@mui/material'

interface IProps {
  align: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disableGutters?: boolean,
  label: string | any,
  value?: string,
  minWidth?: number
  divider?: boolean
  bnb?: string;
}

export const PropertyListItem = (props: IProps) => {
  const { align = `vertical`, children, disableGutters, value, minWidth = 180, label, bnb, ...other } = props

  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
      {...other}>
      <ListItemText
        disableTypography
        primary={(
          <Box
            sx={{ display: "flex", minWidth: align === 'vertical' ? 'inherit' : minWidth }}
          >
            <Typography variant="subtitle2" sx={{ marginRight: "4px" }}>
              {label}
            </Typography>
            {props.icon}
          </Box>
        )}
        secondary={(
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0,
            }}
          >
            {children || (
              <Typography
                color="text.secondary"
                variant="body2"
              >
                {value} {bnb}
              </Typography>
            )}
          </Box>
        )}
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0,
        }}
      />
    </ListItem>
  )
}
