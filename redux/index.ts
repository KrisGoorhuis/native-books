import {
  configureStore,
  combineReducers
}                       from '@reduxjs/toolkit'
import logger           from 'redux-logger'
import bookDataSlice    from './slices/bookData'

export type State = ReturnType<typeof reducer>


const reducer = combineReducers({
  bookData : bookDataSlice.reducer
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
