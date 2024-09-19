import React from 'react'
import { Grid } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { ONLY_DATE_FORMAT } from '../../constants/global'

interface Props {
  startDate?: string | undefined
  endDate?: string | undefined
  onChange: (startDate?: string | undefined, endDate?: string | undefined) => void
}

const DateRangePicker = ({ startDate, endDate, onChange }: Props) => {
  const handleDateChange = (type: 'startDate' | 'endDate') => (date: Dayjs | null) => {
    const newDateRange = { startDate, endDate, [type]: type === 'startDate' ? date?.startOf('day').format() : date?.endOf('day').format() }
    onChange(newDateRange.startDate, newDateRange.endDate)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={6} lg={6}>
          <DatePicker
            format={ONLY_DATE_FORMAT}
            disableFuture
            label="เลือกวันที่เริ่มต้น"
            value={startDate ? dayjs(startDate) : null}
            onChange={handleDateChange('startDate')}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={6} lg={6}>
          <DatePicker
            format={ONLY_DATE_FORMAT}
            disableFuture
            label="เลือกวันที่สิ้นสุด"
            value={endDate ? dayjs(endDate) : null}
            onChange={handleDateChange('endDate')}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default DateRangePicker