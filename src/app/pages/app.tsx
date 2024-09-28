import { ConfigProvider } from 'antd'
import thTH from 'antd/locale/th_TH'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { Provider } from 'react-redux'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import localeData from 'dayjs/plugin/localeData'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import DefaultLayout from '../components/Layouts/DefaultLayout'
import themeConfig from '../themes'
import { store } from '../../store'
import { useEffect } from 'react'

import PhoneNumberRetrievalSystemPage from './PhoneNumberRetrievalSystem'
import CustomerMessagingSystem from './CustomerMessagingSystem'
import AutoCommentSystemPage from './AutoCommentSystem'

dayjs.extend(utc)
dayjs.extend(weekday)
dayjs.extend(buddhistEra)
dayjs.extend(isSameOrAfter)
dayjs.extend(localeData)
dayjs.extend(duration)
dayjs.extend(isBetween)
dayjs.locale('th')

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location]);

  return null;
}

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <ConfigProvider theme={themeConfig} locale={thTH}>
          <GoogleReCaptchaProvider
            reCaptchaKey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY ?? ''}
          >
            <DefaultLayout>
              <Routes>
                <Route
                  index element={<div>Home</div>}
                />
                <Route path="phone-number-retrieval/*" element={<PhoneNumberRetrievalSystemPage />} />
                <Route path="customer-messaging/*" element={<CustomerMessagingSystem />} />
                <Route path='auto-comment-system/*' element={<AutoCommentSystemPage />}/>
              </Routes>
            </DefaultLayout>
          </GoogleReCaptchaProvider>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  )

}
export default App
