import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as DatePickerMui } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { ONLY_DATE_FORMAT } from '../../constants/global'

interface Props {
  date?: string | undefined
  disable: "future" | "past" | "none"
  onChange: (date?: string | undefined) => void
}

const DatePicker = ({ date, disable = "none", onChange }: Props) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerMui
        format={ONLY_DATE_FORMAT}
        disableFuture={disable === "future"}
        disablePast={disable === "past"}
        label="เลือกวันที่"
        value={date ? dayjs(date) : null}
        onChange={(date: Dayjs | null) => onChange(date?.format())}
        sx={{ width: '100%' }}
      />
    </LocalizationProvider>
  )
}

export default DatePicker