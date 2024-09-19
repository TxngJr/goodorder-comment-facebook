import React from 'react'
import styled from 'styled-components'
import { PageHeader } from '@ant-design/pro-layout'
import { Box, Breadcrumbs, Link as LinkMui, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { BreadcrumbsSeparator } from '../BreadcrumbsSeparator'
import { Link } from 'react-router-dom'
import PageUrls from '../../constants/page-urls'
import { Tag } from '../Tag'

interface HeaderContentProps {
  title: string;
  routes?: {
    path: string;
    breadcrumbName: string;
  }[];
  descriptions: string;
  goBack?: boolean;
  children?: React.ReactNode;
  childrenRight?: React.ReactNode;
  tags?: HeaderTagProps[]
}

export interface HeaderTagProps {
  title: string;
  color: string;
  value: string | number | any;
  classifier: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  title,
  routes,
  goBack,
  descriptions,
  children,
  childrenRight,
  tags,
}) => {
  return (
    <>
      <Grid container justifyContent="space-between" spacing={1} mb={4}>
        <Grid item xs={12} md={12} lg={12}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: childrenRight ? 'space-between' : 'flex-start',
              alignItems: 'center',
            }}>
            <Typography variant="h3">{title}</Typography>
            {childrenRight}
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Breadcrumbs
            sx={{ fontSize: '14px' }}
            separator={<BreadcrumbsSeparator />}
          >
            <LinkMui
              component={Link}
              color="text.primary"
              variant="subtitle2"
              to={PageUrls.Home}
            >
              แดชบอร์ด
            </LinkMui>
            {routes?.map((route) => (
              <LinkMui
                key={route.path}
                component={Link}
                color="text.primary"
                variant="subtitle2"
                to={route.path}
              >
                {route.breadcrumbName}
              </LinkMui>
            ))}
            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
          </Breadcrumbs>
          <Box>
            {tags?.map((tag, index) => (
              <Tag
                key={index}
                color={tag.color}
                sx={{ marginRight: "5px", marginBottom: "8px" }}
              >
                {tag.title} {(Number(tag.value) || 0).toLocaleString()} {tag.classifier}
              </Tag>
            ))}
          </Box>
          {children}
        </Grid>
      </Grid>
    </>
  )
}

export default HeaderContent

const PageHeaderCustom = styled(PageHeader)`
    background: white;
    height: fit-content;
    overflow: auto;
    padding: 12px 24px 16px;
`
