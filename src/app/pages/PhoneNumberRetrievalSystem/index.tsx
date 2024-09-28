import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

import { ContentWrapper } from '../../components/ContentWrapper'
import Helmet from '../../components/Helmet'
import { Button, Card, Grid, IconButton, TextField, Typography, useMediaQuery } from '@mui/material'
import HeaderContent from '../../components/Layouts/HeaderContent'
import { MaxValueField, MinValueField } from '../../components/MinMaxInput';
import ProgressBarWithPercent from '../../components/BorderLinearProgress';

type Props = {}

const PhoneNumberRetrievalSystem: React.FC<Props> = () => {
  const isMobile = useMediaQuery('(max-width:600px)')
  const [minValue, setMinValue] = useState<number>(0)
  const [message, setMessage] = useState<string>("")
  const [maxValue, setMaxValue] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  return (
    <ContentWrapper>
      <Helmet title="ระบบดึงเบอร์โทรจากคนคอมเม้นแฟนเพจ" />
      <HeaderContent
        goBack
        title="ระบบดึงเบอร์โทรจากคนคอมเม้นแฟนเพจ"
        descriptions="ระบบดึงเบอร์โทรจากคนคอมเม้นแฟนเพจ"
      />
      <Card
        sx={{
          padding: 2,
          height: "75vh",
        }}
      >
        <Grid container spacing={2} mt={1} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2} justifyContent={isMobile ? "center" : 'flex-end'} alignItems={'center'}>
              {isRunning ?
                <Grid item xs={10} lg={10}>
                  <ProgressBarWithPercent value={50} />
                </Grid>
                :
                <>
                  <Grid item xs={6} lg={2}>
                    <MinValueField minValue={minValue} setMinValue={setMinValue} />
                  </Grid>
                  <Grid item xs={6} lg={2}>
                    <MaxValueField minValue={minValue} maxValue={maxValue} setMaxValue={setMaxValue} />
                  </Grid>
                </>
              }
              <Grid item xs={12} lg={2}>
                <Button
                  color={isRunning ? "error" : "primary"}
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={isRunning ? <StopCircleOutlinedIcon /> : <PlayCircleOutlineIcon />}
                  sx={{ height: '100%' }}
                  onClick={() => {
                    setIsRunning(!isRunning)
                    setCount(isRunning ? 0 : 10)
                  }}
                >
                  {isRunning ?
                    "หยุดดึงเบอร์โทร"
                    : "เริ่มดึงเบอร์โทร"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {count > 0 &&
            <Grid item xs={12} lg={12} alignItems={'center'} justifyContent={'center'} display={'flex'}>
              <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={12} lg={3}>
                  <Typography variant="h6" color="textPrimary" sx={{ marginRight: 2 }}>
                    จำนวนเบอร์โทรที่ดึงได้: {count} รายการ
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={2}>
                  <Button
                    color="info"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ height: '100%' }}
                    startIcon={<DownloadForOfflineOutlinedIcon />}
                  >
                    ดาวน์โหลดไฟล์
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          }
          <Grid item xs={12} lg={12}>
            <Typography variant="h6" color="textSecondary">
              ใส่ ID หรือลิ้ง แฟนเพจ โปรไฟล์ หรือ กลุ่ม ถ้าเป็นโพสให้คลิกขวาที่เวลาของโพสแล้วcopy มาวางเลย 1 บรรทัดต่อ 1 ลิ้งหรือid
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              required={true}
              id={'message'}
              name={'message'}
              disabled={isRunning}
              multiline
              rows={10}
              fullWidth
              label={'ใส่ ID แฟนเพจ โปรไฟล์ กลุ่ม 1 บรรทัดต่อ 1 ID'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
        </Grid>
      </Card>
    </ContentWrapper>
  )
}

export default PhoneNumberRetrievalSystem