// import React, { useCallback, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import queryString from 'query-string'
// import dayjs, { Dayjs } from 'dayjs'

// import Helmet from '../../../../components/Helmet'
// import HeaderContent from '../../../../components/Layouts/HeaderContent'
// import { ContentWrapper } from '../../../../components/ContentWrapper'
// import useAxios, { axiosInstance } from '../../../../hooks/useAxios'
// import { PaginationResponseInterface } from '../../../../types/pagination'
// import { IProductTransaction } from '../../../../types/product'
// import ProductsTransactionTable from '../../components/StockTable'
// import PageUrls from '../../../../constants/page-urls'
// import ProductsTransactionFilter, { IFilterMapped } from '../../components/StockFilter'
// import { Card, Grid } from '@mui/material'
// import { MAX_DONWLOAD_PAGE_SIZE } from '../../../../constants/global'
// import { message } from 'antd'
// import * as XLSX from 'xlsx'

// const StockListPage = () => {
//   const navigate = useNavigate()
//   const queryStr = queryString.parse(window.location.search)

//   const [searchFilter, setSearchFilter] = useState<IFilterMapped>({
//     page: Number(queryStr.page ?? 1),
//     perPage: 15,
//   })
//   const [filter, setFilter] = useState<IFilterMapped>({
//     page: Number(queryStr.page ?? 1),
//     perPage: 15,
//     search: queryStr.search?.length ? String(queryStr.search).toLowerCase() : undefined,
//     startDate: queryStr.startDate
//       ? dayjs(String(queryStr.startDate)).startOf('day').format()
//       : undefined,
//     endDate: queryStr.endDate ? dayjs(String(queryStr.endDate)).endOf('day').format() : undefined,
//   })

//   const onFilterChange = useCallback((newFilter: IFilterMapped) => {
//     setFilter(newFilter)
//   }, [setFilter])

//   const handleSearch = (newFilter: IFilterMapped) => {
//     setFilter(newFilter)
//     setSearchFilter(newFilter)
//     const newQuery = queryString.stringify({ ...newFilter })
//     navigate(`${PageUrls.Stock}?${newQuery}`, {
//       replace: true,
//     })
//   }

//   useEffect(() => {
//     handleSearch(filter)
//   }, [])

//   const productTransactionList = useAxios<
//     PaginationResponseInterface<IProductTransaction>
//   >({
//     method: 'GET',
//     url: '/product/transactions',
//     params: searchFilter,
//   })

//   const handleOnDownload = useCallback(async (date: Dayjs) => {
//     let loop = true
//     let page = 1, perPage = MAX_DONWLOAD_PAGE_SIZE
//     const data: IProductTransaction[] = []
//     while (loop) {
//       try {
//         const result = await axiosInstance.get('/product/transactions', {
//           params: {
//             ...searchFilter,
//             page,
//             perPage,
//             startDate: date.startOf('month').format('YYYY-MM-DD'),
//             endDate: date.endOf('month').format('YYYY-MM-DD'),
//           },
//         })
//         page++
//         if (!result?.data?.records.length) {
//           loop = false
//           break
//         }
//         data.push(...result.data.records)
//         if (result?.data?.count < perPage) {
//           loop = false
//           break
//         }
//       } catch (e) {
//         message.warning('เกิดข้อผิดพลาดในการดาวน์โหลดข้อมูลบางส่วน')
//         break
//       }
//     }
//     if (!data.length) {
//       message.warning('ไม่พบข้อมูล')
//       return
//     }
//     const rows = data?.map((dt: IProductTransaction) => {
//       return {
//         'ชื่อสินค้า': dt.product?.name,
//         'จำนวน': dt.quantity,
//         'คำสั่งซื้อ': dt.orderCode,
//         'ทำรายการโดย': dt.actor,
//         'หมายเหตุ': dt.description,
//         'วันที่ลงข้อมูล': dt.date,
//       }
//     })
//     const ws = XLSX.utils.json_to_sheet(rows)
//     const wb = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
//     XLSX.writeFile(wb, `product-transactions.xlsx`)
//     message.success('ดาวน์โหลดสำเร็จ')
//   }, [])

//   const onUpdateProductTransactionSuccess = useCallback(async () => {
//     try {
//       await productTransactionList.mutate()
//     } catch (error) {
//     }
//   }, [searchFilter])

//   return (
//     <ContentWrapper>
//       <Helmet title="รายการสินค้าเข้า-ออก" />
//       <Grid
//         container
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Grid item>
//           <HeaderContent
//             goBack
//             title="รายงาน ลด-เพิ่ม สินค้า"
//             descriptions="รายงาน ลด-เพิ่ม สินค้า"
//             tags={[
//               {
//                 title: 'จำนวน',
//                 color: 'info',
//                 value: productTransactionList.data?.count ?? 0,
//                 classifier: 'รายการ',
//               },
//             ]}
//           />
//         </Grid>
//       </Grid>
//       <Card
//         sx={{
//           padding: 2,
//         }}>
//         <ProductsTransactionFilter
//           filter={filter}
//           onFilterChange={onFilterChange}
//           onSearch={handleSearch}
//           onDownload={handleOnDownload}
//         />
//         <ProductsTransactionTable
//           isLoading={productTransactionList.isLoading}
//           data={productTransactionList.data?.records ?? []}
//           onUpdateProductTransactionSuccess={onUpdateProductTransactionSuccess}
//           filter={filter}
//           onFilterChange={handleSearch}
//           total={productTransactionList.data?.count ?? 0}
//         />
//       </Card>
//     </ContentWrapper>
//   )
// }

// export default StockListPage

const StockListPage = () => {
  return (
    <div>Stock Page</div>
  )
}