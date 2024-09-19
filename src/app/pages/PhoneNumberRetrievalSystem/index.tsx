import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

// import StockListPage from './Features/StockList'

const StockPage = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
          // <StockListPage /> 
          <div>Stock Page</div>
        }
      />
    </Routes>
  )
}

export default StockPage
