// import React, { useState } from 'react'
// import { Dayjs } from 'dayjs'
// import { Grid } from '@mui/material'
// import SearchIcon from '@mui/icons-material/Search'
// import Button from '@mui/material/Button'
// import ClearIcon from '@mui/icons-material/Clear'
// import DateRangePicker from '../../../components/DateRangePicker'
// import SelectSearchMultiple, { IOptionSelect } from '../../../components/SelectSearchMultiple'
// import { IProduct } from '../../../types/product'
// import useAxios from '../../../hooks/useAxios'
// import { PaginationResponseInterface } from '../../../types/pagination'
// import ExportExcel from '../../../components/Export'
// import { IMerchant } from '../../../types/merchant'
// import SelectSearch from '../../../components/SelectSearch'


// export interface IFilterMapped {
//   page?: number;
//   perPage?: number;
//   search?: string;
//   products?: string[];
//   startDate?: string;
//   endDate?: string;
//   merchant?: string;
// }

// interface FilterGroupProps {
//   filter: IFilterMapped
//   onFilterChange: (filter: IFilterMapped) => void;
//   onSearch: (filter: IFilterMapped) => void;
//   onDownload?: (date: Dayjs) => void;
// }

// const ProductsTransactionFilter = (props: FilterGroupProps) => {
//   const { filter, onFilterChange, onSearch, onDownload } = props
//   const { page, perPage, products, search, startDate, endDate } = filter
//   const [resetAutoComplete, setResetAutoComplete] = useState<string>("")
//   const [searchProduct, setSearchProduct] = useState<string>('')
//   const [searchMerchantList, setSearchMerchantList] = useState<string>()
  
//     const merchantList = useAxios<PaginationResponseInterface<IMerchant>>({
//       method: 'GET',
//       url: '/merchant',
//       params: {
//         page: 1,
//         perPage: 10,
//         search: searchMerchantList,
//       }
//     })
  
//     const handleSearchMerchantList = async (value: string) => {
//       setSearchMerchantList(value)
//       await merchantList.mutate()
//     }    

//   const productsList = useAxios<
//     PaginationResponseInterface<IProduct>
//   >({
//     method: 'GET',
//     url: '/product',
//     params: {
//       page: 1,
//       perPage: 5,
//       search: searchProduct,
//       startDate: '',
//       endDate: '',
//     },
//   })

//   const handleSearchProduct = async (value: string) => {
//     setSearchProduct(value)
//     await productsList.mutate()
//   }
//   return (
//     <Grid container spacing={2} mb={2}>
//       <Grid item xs={12} lg={6}>
//         <SelectSearchMultiple<IProduct>
//             placeholder={'เลือกสินค้า'}
//             label={'เลือกสินค้า'}
//             onSelect={(e) => {
//               const selectedProductIds = e?.map(product => product?.value?._id!)
//               onFilterChange({ ...filter,products: selectedProductIds })
//             }}
//             search={searchProduct}
//             onSearch={handleSearchProduct}
//             options={
//              productsList?.data?.records.filter((product: IProduct) => !products?.includes(product._id as string))
//              .map((product: IProduct) => product.isAvailable &&({
//                 label: `${product.name} (${product.code})`,
//                 image: product.image,
//                 value: product,
//               })).reduce((acc: IOptionSelect<IProduct>[], product) => {
//                 if (product) {
//                   acc.push(product)
//                 }
//                 return acc
//               }, []) || [] as IOptionSelect<IProduct>[]
//             }
//           />
//       </Grid>
//       {/* <Grid item xs={12} lg={12}>
//         <TextField
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           label={'ชื่อสินค้า, รหัสสินค้า'}
//           fullWidth
//           id="search"
//           name="search"
//           variant="filled"
//           value={search ?? ""}
//           onChange={(e) => onFilterChange({ ...filter, search:e.target.value })}
//         />
//       </Grid> */}
//       <Grid item xs={12} lg={6}>
//         <DateRangePicker
//           startDate={startDate}
//           endDate={endDate}
//           onChange={(startDate, endDate) => {
//             onFilterChange({ ...filter, startDate, endDate })
//           }}
//         />
//       </Grid>
//       <Grid item xs={12} lg={6}>
//         <SelectSearch<IMerchant>
//         resetAutoComplete={resetAutoComplete}
//           label={'ร้านค้า'}
//           onSelect={(e) => onFilterChange({ ...filter, merchant: e?.value?.prefix })}
//           search={searchMerchantList || ''}
//           onSearch={handleSearchMerchantList}
//           options={
//             merchantList.data?.records
//               .map((merchant: IMerchant) => ({
//                 label: `${merchant.username} (${merchant.name})`,
//                 value: merchant,
//               })) || [] as IOptionSelect<IMerchant>[]
//           } />
//       </Grid>
//       <Grid item xs={12} lg={2}>
//         <Button
//           color="primary"
//           size="large"
//           fullWidth
//           variant="contained"
//           startIcon={<SearchIcon />}
//           onClick={() => onSearch(filter)}
//           sx={{ height: '100%' }}
//         >
//           ค้นหา
//         </Button>
//       </Grid>
//       <Grid item xs={4} lg={2}>
//         <Button
//           color="inherit"
//           size="large"
//           fullWidth
//           variant="contained"
//           startIcon={<ClearIcon />}
//           onClick={() => {
//             onFilterChange({
//               page,
//               perPage,
//               search: undefined,
//               startDate: undefined,
//               endDate: undefined,
//               merchant: undefined,
//             })
//             onSearch({
//               page,
//               perPage,
//               search: undefined,
//               startDate: undefined,
//               endDate: undefined,
//               merchant: undefined,
//             })
//             setResetAutoComplete(new Date().getTime().toString())
//           }}
//           sx={{ height: '100%' }}
//         >
//           รีเซ็ต
//         </Button>
//       </Grid>
//       <Grid item xs={12} lg={2}>
//         <ExportExcel onDownload={onDownload} />
//       </Grid>
//     </Grid>
//   )
// }

// export default ProductsTransactionFilter
const StockFilter = () => {
  return (
    <div>
      StockFilter
    </div>
  )
}