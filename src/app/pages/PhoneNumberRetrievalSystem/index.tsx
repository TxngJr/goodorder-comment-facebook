import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

import { ContentWrapper } from '../../components/ContentWrapper'
import Helmet from '../../components/Helmet'
import { Button, Card, Grid, IconButton, TextField, Typography } from '@mui/material'
import HeaderContent from '../../components/Layouts/HeaderContent'
import { MaxValueField, MinValueField } from '../../components/MinMaxInput';
import ProgressBarWithPercent from '../../components/BorderLinearProgress';

type Props = {}

const PhoneNumberRetrievalSystem: React.FC<Props> = () => {
  const [list, setList] = useState<string[]>([""])
  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)

  const handleDeleteListByIndex = (index: number) => {
    const newList = list.filter((_, i) => i !== index)
    setList(newList)
  }

  const changeValueByIndexList = (index: number, value: string) => {
    const newList = list.map((item, i) => {
      if (i === index) {
        return value
      }
      return item
    }).filter(
      (value) => value !== ""
    )

    if (newList[newList.length - 1] !== "") {
      newList.push("")
    }
    setList(newList)
  }

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
          height: "75vh"
        }}
      >
        <Grid container spacing={2} mt={1} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={12} lg={12}>
            <Grid container spacing={2} xs={12} lg={12} justifyContent={'flex-end'} alignItems={'center'}>
              {isRunning ?
                <Grid item xs={10} lg={10}>
                  <ProgressBarWithPercent value={50} />
                </Grid>
                :
                <>
                  <Grid item xs={1} lg={1}>
                    <MinValueField minValue={minValue} setMinValue={setMinValue} />
                  </Grid>
                  <Grid item xs={1} lg={1}>
                    <MaxValueField minValue={minValue} maxValue={maxValue} setMaxValue={setMaxValue} />
                  </Grid>
                </>
              }
              <Grid item xs={2} lg={2}>
                <Button
                  color={isRunning ? "error" : "primary"}
                  variant="contained"
                  size="large"
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
              <Typography variant="h6" color="textPrimary" sx={{ marginRight: 2 }}>
                จำนวนเบอร์โทรที่ดึงได้: {count} รายการ
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
          <Grid item xs={12} lg={12}>
            <Typography variant="h6" color="textSecondary">
              รายการ ID แฟนเพจ โปรไฟล์ กลุ่ม 1
            </Typography>
          </Grid>
          {list.map((data, index: number) => {
            return (
              <Grid item
                key={index}
                xs={12}
                lg={12}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TextField
                  required={list.length !== index + 1}
                  id={data}
                  name={data}
                  disabled={isRunning}
                  fullWidth
                  label={'ID แฟนเพจ โปรไฟล์ กลุ่ม 1'}
                  value={data}
                  onChange={(e) =>
                    changeValueByIndexList(index,
                      e.target.value,
                    )
                  }
                />
                {list.length !== index + 1 && !isRunning &&
                  <IconButton
                    onClick={() =>
                      handleDeleteListByIndex(index)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              </Grid>
            )
          })}
        </Grid>
      </Card>
    </ContentWrapper>
  )
}

export default PhoneNumberRetrievalSystem