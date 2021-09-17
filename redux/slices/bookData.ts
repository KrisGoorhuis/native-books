import {
   createSlice,
   PayloadAction,
}                         from "@reduxjs/toolkit"
import SliceNames         from "../../model/redux/sliceNames"
import { 
   BookData,
}                         from "../../model/BookData"
 
 
interface BookDataState {
   retrievingBookData       : boolean,
   failedRetrievingBookData : boolean
   bookData                 : BookData | null,
}
const initialBookDataState: BookDataState = {
   retrievingBookData       : false,
   failedRetrievingBookData : false,
   bookData                 : null,
}

const bookDataSlice = createSlice({
   name: SliceNames.BOOK_DATA,
   initialState: initialBookDataState,
   reducers: {
      setRetrievingBookData       : (state, { payload }: PayloadAction<boolean>) => { state.retrievingBookData = payload },
      setFailedRetrievingBookData : (state, { payload }: PayloadAction<boolean>) => { state.failedRetrievingBookData = payload },
      setNewBookData : (state, { payload }: PayloadAction<BookData>) => { state.bookData = payload },
   },
})

export const {
   setRetrievingBookData,
   setNewBookData,
   setFailedRetrievingBookData,
} = bookDataSlice.actions

export default bookDataSlice
