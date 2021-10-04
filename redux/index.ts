import {
  configureStore,
  combineReducers
}                       from '@reduxjs/toolkit'
import logger           from 'redux-logger'
import bookDataSlice    from './slices/bookData'
import librarySlice     from './slices/library'

export type State = ReturnType<typeof reducer>


const reducer = combineReducers({
  bookData : bookDataSlice.reducer,
  library  : librarySlice.reducer
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
