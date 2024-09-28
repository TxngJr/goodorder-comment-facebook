import { Box, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material'
import { IFanPage } from '../../../types/fanpage';
import ImgTag from '../../../components/ImgTag';
import { useMemo } from 'react';
import { FaPaperPlane, FaEyeSlash, FaCommentDots, FaThumbsUp } from 'react-icons/fa';
import DashboardCard from './CommandCard';
import SettingReplyComment from './SettingReplyComment';
import KeywordReplyPanel from './KeywordReplyPanelComment';
import PostSystemInfo from './PostSystemInfo';
import LineCharts from '../../../components/LineCharts';

interface FanPageModalProps {
  data: IFanPage;
}

const FanPageModal = ({ data }: FanPageModalProps) => {
  const series = [
    {
      name: 'Reply',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    },
    {
      name: 'Hide Post',
      data: [20, 30, 45, 32, 34, 52, 60, 80, 120]
    },
    {
      name: 'Sent Message',
      data: [15, 25, 40, 30, 33, 50, 55, 75, 110]
    }
  ];

  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  const cardData = useMemo(() => {
    return [
      {
        title: 'ตอบกลับคอมเม้น',
        result: '0/0',
        description: 'จำนวนตอบกลับ วันนี้/ทั้งเดือน',
        icon: FaCommentDots,
        color: '#9c27b0', // Purple
      },
      {
        title: 'ส่งข้อความคอมเม้น',
        result: '0/0',
        description: 'จำนวนส่งข้อความวันนี้/ทั้งเดือน',
        icon: FaPaperPlane,
        color: '#2196f3', // Blue
      },
      {
        title: 'กดไลค์คอมเม้น',
        result: '0/0',
        description: 'จำนวนกดไลค์วันนี้/ทั้งเดือน',
        icon: FaThumbsUp,
        color: '#3f51b5', // Indigo
      },
      {
        title: 'ซ่อนโพส',
        result: '0/0',
        description: 'จำนวนซ่อนโพส วันนี้/ทั้งเดือน',
        icon: FaEyeSlash,
        color: '#4caf50', // Green
      },
    ]
  }
    , [])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            mb: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="subtitle2" color="text.primary" mr={2}>
              {data.pageName}
            </Typography>
            <FormControlLabel control={<Checkbox defaultChecked />} label="เปิดใช้งาน"
              componentsProps={{
                typography: { fontSize: '14px' },
              }}
            />
          </Box>
          <ImgTag
            imageUrl={data.image}
            name={data.pageName}
            size={48}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <LineCharts
              series={series}
              categories={categories} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2}>
              {cardData.map((card, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <DashboardCard
                    title={card.title}
                    result={card.result}
                    description={card.description}
                    icon={card.icon}
                    color={card.color}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <PostSystemInfo />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <SettingReplyComment />
        </Grid>
        <Grid item xs={12} lg={6}>
          <KeywordReplyPanel />
        </Grid>
      </Grid>
    </Box>
  )
}

export default FanPageModal
