import { Route, Routes } from 'react-router-dom'
import FanPageList from './Features/FanPageList'


const AutoCommentSystemPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          < FanPageList />
        }
      />
    </Routes>
  )
}

export default AutoCommentSystemPage
