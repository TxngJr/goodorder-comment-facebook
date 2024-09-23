import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';

import { ContentWrapper } from '../../components/ContentWrapper'
import Helmet from '../../components/Helmet'
import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import HeaderContent from '../../components/Layouts/HeaderContent'
import { MaxValueField, MinValueField } from '../../components/MinMaxInput';
import ProgressBarWithPercent from '../../components/BorderLinearProgress';
import InputUpload from '../../components/InputUpload';
import { axiosInstance } from '../../hooks/useAxios';
import { message } from 'antd';
import SelectSearch, { IOptionSelect } from '../../components/SelectSearch';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ONLY_DATE_TIME_FORMAT } from '../../constants/global';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type Props = {}

// message
// files images or videos
// page 
// mode ใช้ข้อมูลเดิมที่มีอยู่แล้วและจะดึงเฉพาะข้อมูลใหม่ๆที่ยังไมได้ดึง, ใช้ข้อมุลเดิมที่ระบบส่งไปล่าสุด, ให้ระะบบแสกนคนทั้งหมดใหม่
// folderStatus เลือกโฟลเดอร์ที่ต้องการส่ง
// tags เลือกแท็ก(เว้นว่างไว้หากต้องการดึงทั้งหมด)
// gender เลือกเพศ ชาย, หญิง, ทั้งหมด
// dateRange เลือกช่วงวันที่ที่ต้องการดึง
// maxComment จำนวนคอมเม้นที่ต้องการดึง
// isFollow ดึงคนที่ติดตามหรือไม่ติดตาม
// isRead ดึงคนที่อ่านหรือไม่อ่าน
// isSaveFolder บันทึกเป็นโฟลเดอร์
// isSortLatest จัดเรียงล่าสุด
// isInterVal ระยะเวลาการดึง
// intervalTime ระยะเวลาการดึง <ul id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd" class="dropdown-content select-dropdown" tabindex="0" style=""><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd0" tabindex="0"><span>ไม่พักเลย</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd1" tabindex="0" class="selected"><span>ทุก 40 คนพัก 1 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd2" tabindex="0"><span>ทุก 60 คนพัก 1 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd3" tabindex="0"><span>ทุก 100 คนพัก 1 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd4" tabindex="0"><span>ทุก 200 คนพัก 1 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd5" tabindex="0"><span>ทุก 40 คนพัก 2 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd6" tabindex="0"><span>ทุก 60 คนพัก 2 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd7" tabindex="0"><span>ทุก 100 คนพัก 2 นาที</span></li><li id="select-options-d1f2edf5-bc00-6992-d9b6-e724ef0c10bd8" tabindex="0"><span>ทุก 200 คนพัก 2 นาที</span></li></ul>
// startDateTime เวลาเริ่มต้น

interface IPage {
  objectId: string
  name: string
  image: string
}

const data: { records: IPage[] } = {
  records: [
    {
      objectId: '1',
      name: 'เพจ 1',
      image: 'https://via.placeholder.com/150',
    },
    {
      objectId: '2',
      name: 'เพจ 2',
      image: 'https://via.placeholder.com/150',
    },
    {
      objectId: '3',
      name: 'เพจ 3',
      image: 'https://via.placeholder.com/150',
    },
  ]
}

const userSentSuccess: {
  image: string
  name: string
  status: string
}[] = [
    {
      image: 'https://via.placeholder.com/150',
      name: 'User 1',
      status: 'ส่งข้อความสำเร็จ'
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'User 2',
      status: 'ส่งข้อความสำเร็จ'
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'User 3',
      status: 'ส่งข้อความสำเร็จ'
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'User 4',
      status: 'ส่งข้อความสำเร็จ'
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'User 5',
      status: 'ส่งข้อความสำเร็จ'
    },
  ]

const modeSelect: IOptionSelect<string>[] = [
  {
    label: 'ใช้ข้อมูลเดิมที่มีอยู่แล้วและจะดึงเฉพาะข้อมูลใหม่ๆที่ยังไมได้ดึง',
    value: '1'
  },
  {
    label: 'ใช้ข้อมุลเดิมที่ระบบส่งไปล่าสุด',
    value: '2'
  },
  {
    label: 'ให้ระะบบแสกนคนทั้งหมดใหม่',
    value: '3'
  }
]

const intervalTimeSelect: IOptionSelect<string>[] = [
  {
    label: 'ไม่พักเลย',
    value: '1'
  },
  {
    label: 'ทุก 40 คนพัก 1 นาที',
    value: '2'
  },
  {
    label: 'ทุก 60 คนพัก 1 นาที',
    value: '3'
  },
  {
    label: 'ทุก 100 คนพัก 1 นาที',
    value: '4'
  },
  {
    label: 'ทุก 200 คนพัก 1 นาที',
    value: '5'
  },
  {
    label: 'ทุก 40 คนพัก 2 นาที',
    value: '6'
  },
  {
    label: 'ทุก 60 คนพัก 2 นาที',
    value: '7'
  },
  {
    label: 'ทุก 100 คนพัก 2 นาที',
    value: '8'
  },
  {
    label: 'ทุก 200 คนพัก 2 นาที',
    value: '9'
  },
]

interface IFormValues {
  message: string
  files: string[]
  page: string
  mode: string
  folderStatus: string
  tags: string[]
  gender: string
  dateRange: string
  maxComment: number
  isFollow: boolean
  isRead: boolean
  isSaveFolder: boolean
  isSortLatest: boolean
  isInterVal: boolean
  intervalTime: string
  startDateTime: string
}


const getFormValidationSchema = () => {
  return Yup.object({
    message: Yup.string().required('กรุณากรอกข้อความ'),
    files: Yup.array().of(Yup.string()),
    page: Yup.string().required('กรุณาเลือกเพจ'),
    mode: Yup.string().required('กรุณาเลือกโหมด'),
    folderStatus: Yup.string().required('กรุณาเลือกโฟลเดอร์'),
    tags: Yup.array().of(Yup.string()),
    gender: Yup.string().required('กรุณาเลือกเพศ'),
    dateRange: Yup.string().required('กรุณาเลือกช่วงวันที่'),
    maxComment: Yup.number().required('กรุณากรอกจำนวนคอมเม้น'),
    isFollow: Yup.boolean().required('กรุณาเลือกการติดตาม'),
    isRead: Yup.boolean().required('กรุณาเลือกการอ่าน'),
    isSaveFolder: Yup.boolean().required('กรุณาเลือกการบันทึกเป็นโฟลเดอร์'),
    isSortLatest: Yup.boolean().required('กรุณาเลือกการจัดเรียงล่าสุด'),
    isInterVal: Yup.boolean().required('กรุณาเลือกการระยะเวลาการดึง'),
    intervalTime: Yup.string().required('กรุณาเลือกระยะเวลาการดึง'),
    startDateTime: Yup.string().required('กรุณาเลือกเวลาเริ่มต้น'),
  })
}

const CustomerMessagingSystem: React.FC<Props> = () => {
  const [list, setList] = useState<string[]>([""])
  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  const formik = useFormik<IFormValues>({
    initialValues: {
      message: '',
      files: [],
      page: '',
      mode: '',
      folderStatus: '',
      tags: [],
      gender: '',
      dateRange: '',
      maxComment: 0,
      isFollow: false,
      isRead: false,
      isSaveFolder: false,
      isSortLatest: false,
      isInterVal: false,
      intervalTime: '',
      startDateTime: '',
    },
    // validationSchema: getFormValidationSchema(),
    onSubmit: async (values) => {
      setIsRunning(!isRunning)
      setCount(isRunning ? 0 : 10)
      try {
        // const reponse = await axiosInstance.request({
        //   method: isUpdate ? 'PUT' : 'POST',
        //   url: isUpdate ? `/category/${category.objectId}` : '/category',
        //   data:
        //   {
        //     ...values,
        //     isAvailable,
        //   },
        // })
        // const { status } = reponse
        // message.success(status === 201 ? 'สร้างหมวดหมู่สำเร็จ' : status === 200 ? `แก้ไขหมวดหมู่ ${category?.name} สำเร็จ` : 'บันทึกข้อมูลไม่สำเร็จ')
        // setIsAvailable(false)
        // formik.resetForm()
        // onClose(false)
        // onUpdateCategorySuccess()
      } catch (e: any) {
        // const messageError = ERRORS_MESSAGE_MAPPER?.[e.response?.data?.message ?? ''] || 'บันทึกข้อมูลไม่สำเร็จ'
        // message.error(messageError)
      }
    },
  })

  const handleUploadClick = async (event: any) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await axiosInstance.post<any>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status !== 201) {
        return message.error('อัพโหลดรูปภาพไม่สำเร็จ')
      }
      await formik.setFieldValue('paymentUrl', response.data.url)
      return message.success('อัพโหลดรูปภาพสำเร็จ')
    } catch (e: any) {
      // const messageError = ERRORS_MESSAGE_MAPPER?.[e.response?.data?.message ?? ''] || 'บันทึกข้อมูลไม่สำเร็จ'
      // message.error(messageError)
    }
  }

  return (
    <ContentWrapper>
      <Helmet title="ระบบส่งข้อความลูกค้า" />
      <HeaderContent
        goBack
        title="ระบบส่งข้อความลูกค้า"
        descriptions="ระบบส่งข้อความลูกค้า"
      />
      <Card
        sx={{
          padding: 2,
        }}
      >
        <Box component="form" mt={1} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={12} lg={12}>
              <Typography variant="h6" gutterBottom>
                {isRunning ? 'กำลังส่งข้อความลูกค้า' : 'ข้อมูลการส่งข้อความ'}
              </Typography>
            </Grid>
            {!isRunning &&
              <>
                <Grid item xs={12} lg={12}>
                  <TextField
                    id="message"
                    fullWidth
                    label="ข้อความ"
                    name="message"
                    multiline
                    rows={4}
                    helperText={
                      formik.touched.message && formik.errors.message as string
                    }
                    error={
                      !!(formik.touched.message && formik.errors.message)
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <InputUpload
                    onRemove={() => formik.setFieldValue('files', [])}
                    handleUploadClick={handleUploadClick}
                    imageUrls={formik.values.files}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <SelectSearch<IPage>
                    label={'เพจ'}
                    onSelect={(e) => e && formik.setFieldValue('page', e?.value.objectId)}
                    search={formik.values.page}
                    onSearch={(e) => formik.setFieldValue('page', e)}
                    options={
                      data?.records.map((record) => ({
                        label: record.name,
                        value: record,
                        image: record.image,
                      }))
                    } />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="mode-label">โหมด</InputLabel>
                    <Select
                      id="mode"
                      name="mode"
                      labelId="mode-label"
                      value={formik.values.mode}
                      onChange={(e) => formik.setFieldValue('mode', e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="" selected>
                        <em>เลือกสถานะ</em>
                      </MenuItem>
                      {
                        modeSelect.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={12}>
                  {/* <Checkbox  
                  label="สถานะโฟลเดอร์"
                  icon={<FavoriteBorder />} 
                  checkedIcon={<Favorite />} 
                  />
                  <Checkbox
                    icon={<BookmarkBorderIcon />}
                    checkedIcon={<BookmarkIcon />}
                  /> */}
                  <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                    <Typography variant="subtitle1" gutterBottom>
                      ตั้งค่าการดึงข้อมูล
                    </Typography>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<FavoriteBorderIcon />}
                            checkedIcon={<FavoriteIcon />}
                            checked={formik.values.isFollow}
                            onChange={formik.handleChange} name="isFollow"
                          />
                        }
                        label="ดึงเฉพาะคนที่ติดตาม"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<MarkunreadOutlinedIcon />}
                            checkedIcon={<MarkunreadIcon />}
                            checked={formik.values.isRead}
                            onChange={formik.handleChange} name="isRead"
                          />
                        }
                        label="ดึงเฉพาะคนที่อ่าน"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<SaveOutlinedIcon />}
                            checkedIcon={<SaveIcon />}
                            checked={formik.values.isSaveFolder}
                            onChange={formik.handleChange} name="isSaveFolder"
                          />
                        }
                        label="นำข้อความที่ส่งแล้วไปเก็บไว้ในโฟลเดอร์ เรียบร้อยแล้ว"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<CategoryOutlinedIcon />}
                            checkedIcon={<CategoryIcon />}
                            checked={formik.values.isSortLatest}
                            onChange={formik.handleChange} name="isSortLatest"
                          />
                        }
                        label="เริ่มส่งจากคนสุดท้ายมาหาคนแรก"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            icon={<WarningAmberOutlinedIcon />}
                            checkedIcon={<WarningOutlinedIcon />}
                            checked={formik.values.isInterVal}
                            onChange={formik.handleChange} name="isInterVal"
                          />
                        }
                        label="ไม่พักโพสเมื่อมีลิ้ง หากเป็น Live สดติ๊กได้"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel id="intervalTime-label">ระยะเวลาการดึง</InputLabel>
                    <Select
                      id="intervalTime"
                      name="intervalTime"
                      labelId="intervalTime-label"
                      value={formik.values.intervalTime}
                      onChange={(e) => formik.setFieldValue('intervalTime', e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="" selected>
                        <em>เลือกระยะเวลาการดึง</em>
                      </MenuItem>
                      {
                        intervalTimeSelect.map((item) => (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <TextField
                    id="maxComment"
                    fullWidth
                    label="จำนวนสูงสุดที่ให้ส่ง"
                    name="maxComment"
                    type="number"
                    helperText={
                      formik.touched.maxComment && formik.errors.maxComment as string
                    }
                    error={
                      !!(formik.touched.maxComment && formik.errors.maxComment)
                    }
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.maxComment}
                  />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      disablePast
                      format={ONLY_DATE_TIME_FORMAT}
                      ampm={false}
                      label="เวลาเริ่มต้น"
                      name="startDateTime"
                      sx={{ width: '100%' }}
                      value={formik.values.startDateTime ? dayjs(formik.values.startDateTime) : null}
                      onChange={(e) => formik.setFieldValue('startDateTime', e)}
                      slotProps={{
                        textField: {
                          helperText: "",
                          error: false,
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            }
            {isRunning &&
              <Grid item xs={12} lg={10}>
                <ProgressBarWithPercent value={50} />
              </Grid>
            }
            <Grid item xs={12} lg={isRunning ? 2 : 12}>
              <Button
                type="submit"
                variant="contained"
                color={isRunning ? 'error' : 'primary'}
                fullWidth
                startIcon={isRunning ? <StopCircleOutlinedIcon /> : <PlayCircleOutlineIcon />}
              >
                ส่งข้อความ
              </Button>
            </Grid>
            {count > 0 &&
              <Grid item xs={12} lg={12} alignItems={'center'} justifyContent={'center'} display={'flex'}>
                <Typography variant="h6" color="textPrimary" sx={{ marginRight: 2 }}>
                  จำนวนคนที่ส่งได้: {count} คน
                </Typography>
                <Button
                  color="info"
                  variant="contained"
                  size="large"
                  sx={{ height: '100%' }}
                  startIcon={<DownloadForOfflineOutlinedIcon />}
                >
                  ดาวน์โหลดไฟล์
                </Button>
              </Grid>
            }
            {isRunning &&
              <Grid item xs={12} lg={12}>
                <Card
                  sx={{
                    padding: 2,
                  }}
                >
                  <Grid container spacing={2} alignItems={'center'} justifyContent={'center'}>
                    {
                      userSentSuccess.map((user, index) => (
                        <Grid item
                          key={index}
                          xs={12}
                          lg={12}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 2,
                            }}
                          >
                            <img
                              src={user.image}
                              alt={user.name}
                              style={{ width: 50, height: 50, borderRadius: '50%' }}
                            />
                          </Box>
                          <Typography variant="subtitle1" color="textPrimary">
                            {user.name} - {user.status}
                          </Typography>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Card>
              </Grid>
            }
          </Grid>
        </Box>
      </Card>
    </ContentWrapper>
  )
}

export default CustomerMessagingSystem