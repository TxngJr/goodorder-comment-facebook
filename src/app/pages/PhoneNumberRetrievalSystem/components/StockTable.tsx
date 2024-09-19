// import { Table } from 'antd'
// import { useContext } from 'react'
// import dayjs from 'dayjs'
// import { Box, Typography } from '@mui/material'

// import { DATE_FORMAT, ONLY_DATE_FORMAT, ONLY_TIME_FORMAT } from '../../../constants/global'
// import { IFilterMapped } from './StockFilter'
// import Pagination from '../../../components/Pagination'
// import { useNavigate } from 'react-router-dom'


// interface IProductsTransactionTableProps {
//   isLoading: boolean
//   data: IProductTransaction[]
//   onUpdateProductTransactionSuccess: () => void
//   filter: IFilterMapped
//   onFilterChange: (filter: IFilterMapped) => void
//   total: number
// }

// const ProductsTransactionTable = ({
//   isLoading,
//   data,
//   onUpdateProductTransactionSuccess,
//   filter,
//   onFilterChange,
//   total,
// }: IProductsTransactionTableProps) => {
//   const ability = useContext(AbilityContext)
//   const navigate = useNavigate()


//   const columns = [
//     {
//       title: 'ลำดับ',
//       dataIndex: 'numberRow',
//       key: 'numberRow',
//       align: 'center' as const,
//       width: 80,
//       render: (numberRow: number) => {
//         return (
//           <Box>
//             <Typography variant="subtitle1" color="text.secondary" textAlign={'center'}>
//               {numberRow}
//             </Typography>
//           </Box>
//         )
//       },
//     },
//     {
//       title: 'ชื่อสินค้า',
//       dataIndex: 'product',
//       key: 'product',
//       align: 'center' as const,
//       render: (product: IProduct) => {
//         return (
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <ImgTag
//               imageUrl={product?.image ?? ''}
//               name={product?.name ?? ''}
//             />
//             <Box
//               sx={
//                 {
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'flex-start',
//                   ml: 1
//                 }
//               }
//             >
//               <Typography variant="subtitle2" color="text.secondary" ml={1}>
//                 {product?.name ?? '-'}
//               </Typography>
//               <Typography variant="caption" color="text.secondary" ml={1}>
//                 {product?.code ?? ''}
//               </Typography>
//             </Box>
//           </Box>
//         )
//       },
//     },
//     {
//       title: 'จำนวน',
//       dataIndex: 'quantity',
//       key: 'quantity',
//       align: 'center' as const,
//       render: (quantity: number) => {
//         return (
//           <Box sx={{ minWidth: 60 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               {quantity.toLocaleString()}
//             </Typography>
//           </Box>
//         )
//       },
//     },
//     {
//       title: 'คำสั่งซื้อ',
//       dataIndex: 'orderCode',
//       key: 'orderCode',
//       align: 'center' as const,
//       render: (orderCode: number) => {
//         return (
//           <Box sx={{ minWidth: 60 }}>
//             <Typography variant="subtitle2" color="text.secondary"
//               onClick={orderCode ? () => {
//                 // navigate(`${PageUrls.Orders.Detail}/${orderCode}`, {
//                 //   replace: true,
//                 // });
//               } : undefined}
//               sx={{ cursor: orderCode ? 'pointer' : 'default' }}
//             >
//               {orderCode || <em>ไม่ระบุ</em>}
//             </Typography>
//           </Box>
//         )
//       },
//     },
//     {
//       title: 'ทำรายการโดย',
//       dataIndex: 'actor',
//       key: 'actor',
//       align: 'center' as const,
//       render: (actor: string, productTransaction: IProductTransaction) => {
//         return (
//           <Box>
//             <Typography variant="subtitle2" color="text.secondary">
//               {actor}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {`[${dayjs(productTransaction.createdAt || undefined).format(DATE_FORMAT)}]`}
//             </Typography>
//           </Box>
//         )
//       },
//     },
//     {
//       title: 'หมายเหตุ',
//       dataIndex: 'description',
//       key: 'description',
//       align: 'center' as const,
//       render: (description: string) => {
//         return (
//           <Box sx={{ minWidth: 120 }}>
//             <Typography variant="subtitle2" color="text.secondary">
//               {description || <em>ไม่ระบุ</em>}
//             </Typography>
//           </Box>
//         )
//       },
//     },
//     {
//       title: 'วันที่ลงข้อมูล',
//       dataIndex: 'date',
//       key: 'date',
//       width: 160,
//       align: 'center' as const,
//       render: (date: string) => {
//         return (
//           <Box>
//             <Typography variant="subtitle2" color="text.secondary">
//               {dayjs(date || undefined).format(ONLY_DATE_FORMAT)}
//             </Typography>
//             <Typography variant="caption" color="text.secondary">
//               {dayjs(date || undefined).format(ONLY_TIME_FORMAT)}
//             </Typography>
//           </Box>
//         )
//       },
//     },
//   ]

//   return (
//     <>
//       <Table
//         size={'middle'}
//         columns={columns}
//         scroll={{ x: columns.reduce((pre, cur: any) => cur.width ? cur.width + pre : pre, 0) }}
//         dataSource={data?.map((productTransaction: IProductTransaction, index: number) => {
//           return {
//             ...productTransaction,
//             key: index,
//             numberRow: index + 1
//           }
//         })}
//         bordered
//         pagination={false}
//       />
//       <Pagination
//         total={total}
//         current={filter.page!}
//         pageSize={filter.perPage!}
//         onChange={(page, perPage) => onFilterChange({ ...filter, page, perPage })}
//       />
//     </>
//   )
// }

// export default ProductsTransactionTable

const StockTable = () => {
  return (
    <div>Stock Table</div>
  )
}