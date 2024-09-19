import { configureStore } from '@reduxjs/toolkit'

import loadingReducer from './reducers/modal/loading.slice'
import modalReducer from './reducers/modal/modal.slice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    loading: loadingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
