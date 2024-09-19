import React from 'react'
import { Grid } from '@mui/material'
import { Input, Pagination as AntdPagination } from 'antd'
import { validateMinMaxValue } from '../../utils/validateMinMaxValue'

interface Props {
  total: number
  current: number
  pageSize: number
  onChange: (page: number, perPage: number) => void
}

const Pagination = ({ total = 0, current = 1, pageSize = 10, onChange }: Props) => {

  return (<Grid container mt={1} spacing={2} alignItems={'center'} justifyContent={'flex-end'}>
    <Grid item>
      <AntdPagination
        total={total}
        pageSize={pageSize || 10}
        current={current}
        showSizeChanger
        onChange={(page, pageSize) => onChange(page, pageSize)}
      />
    </Grid>
    <Grid item>
      <Input
        style={{ width: 90 }}
        maxLength={4}
        placeholder="จำนวน"
        value={pageSize}
        onChange={(e) => onChange(current, validateMinMaxValue(e.target.value, 0, 1000) || 0)}
      />
    </Grid>
  </Grid>)
}

export default Pagination