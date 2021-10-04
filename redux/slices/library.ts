import {
   createSlice,
   PayloadAction,
} from "@reduxjs/toolkit"
import SliceNames from "../../model/redux/sliceNames"
import {
   BookData,
} from "../../model/BookData"


interface LibraryDataState {
   library: BookData[],
}
const initialBookDataState: LibraryDataState = {
   library: [],
}

const librarySlice = createSlice({
   name: SliceNames.LIBRARY,
   initialState: initialBookDataState,
   reducers: {
      addToLibrary: (state, { payload }: PayloadAction<BookData>) => {
         let isInLibrary = false
         console.log("Trying add")
         for (const book of state.library) {
            if (book.id === payload.id) {
               isInLibrary = true
            }
         }

         if (!isInLibrary) {
            state.library = [...state.library, payload]
         }
         else {
            // Shouldn't reach this possibility. How to handle?
         }
      },
      removeFromLibrary: (state, { payload }: PayloadAction<string>) => { state.library = state.library.filter((book: BookData) => book.id !== payload) },
   },
})

export const {
   addToLibrary,
   removeFromLibrary
} = librarySlice.actions

export default librarySlice
