import { Table } from 'antd'
import { Box, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import EditIcon from '@mui/icons-material/Edit'
import dayjs from 'dayjs'
import { ONLY_DATE_FORMAT, ONLY_TIME_FORMAT } from '../../../constants/global'
import { IFanPage } from '../../../types/fanpage'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../../store/reducers/modal/modal.slice'
import { RootState } from '../../../../store'
import FanPageModal from './FanPageModal'
import ImgTag from '../../../components/ImgTag'


interface IFanPageTableProps {
  isLoading: boolean
  data: IFanPage[]
  onUpdateCategorySuccess: () => void
}

const FanPageTable = ({
  isLoading, data, onUpdateCategorySuccess
}: IFanPageTableProps) => {
  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modal.modals);

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'numberRow',
      key: 'numberRow',
      align: 'center' as const,
      width: 80,
      render: (numberRow: number) => {
        return (
          <Box>
            <Typography variant="subtitle1" color="text.secondary" textAlign={'center'}>
              {numberRow}
            </Typography>
          </Box>
        )
      },
    },
    {
      title: 'ชื่อแฟนเพจ',
      dataIndex: 'pageName',
      key: 'pageName',
      align: 'center' as const,
      render: (pageName: string, data: IFanPage) => {
        return (
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <ImgTag
              imageUrl={data.image}
              name={data.pageName}
              size={48}
            />
            <Typography variant="h6" color="text.secondary" ml={1}>
              {pageName}
            </Typography>
          </Box>
        )
      },
    },
    {
      title: 'จำนวนผู้ติดตาม',
      dataIndex: 'followers',
      key: 'followers',
      align: 'center' as const,
      render: (followers: number) => {
        return (
          <Typography variant="subtitle2" color="text.secondary">
            {followers}
          </Typography>
        )
      },
    },
    {
      title: 'จำนวนไลค์',
      dataIndex: 'likes',
      key: 'likes',
      align: 'center' as const,
      render: (likes: number) => {
        return (
          <Typography variant="subtitle2" color="text.secondary">
            {likes}
          </Typography>
        )
      },
    },
    {
      title: 'ผู้ดูแล',
      dataIndex: 'admin',
      key: 'admin',
      align: 'center' as const,
      render: (admin: string) => {
        return (
          <Typography variant="subtitle2" color="text.secondary">
            {admin}
          </Typography>
        )
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as const,
      render: (status: string) => {
        return (
          <Typography variant="subtitle2" color="text.secondary">
            {status === 'Active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
          </Typography>
        )
      },
    },
    {
      dataIndex: '',
      key: 'action',
      width: 120,
      align: 'center' as const,
      render: (_: undefined, data: IFanPage) => {
        return (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              onClick={() =>
                dispatch(
                  openModal({
                    id: 'fanpage-modal',
                    content: <FanPageModal
                      data={data}
                    />,
                  })
                )
              }
            >
              <EditIcon />
            </IconButton>
            <IconButton
            // onClick={() => {
            //   null
            // }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      },
    },
  ]

  return (
    <>
      <Table
        size={'middle'}
        columns={columns}
        scroll={{ x: columns.reduce((pre, cur) => cur.width ? cur.width + pre : pre, 0) }}
        dataSource={data?.map((fanpage: IFanPage, index: number) => {
          return {
            ...fanpage,
            key: fanpage.id,
            numberRow: (index + 1),
          }
        })}
        bordered
        pagination={false}
      />
    </>)
}

export default FanPageTable
