import { baseUrl } from '../../model/http'
import axios, {
   AxiosError
} from 'axios'
import { StandardThunk } from '../../model/redux/thunks'
import {
   setFailedRetrievingBookData,
   setRetrievingBookData,
   setNewBookData,
} from '../../redux/slices/bookData'
import _ from 'lodash'
import { BookData } from '../../model/BookData'


export const retrieveBookData = (): StandardThunk => (dispatch) => {
   dispatch(setRetrievingBookData(true))
   dispatch(setFailedRetrievingBookData(false))

   interface BooksSuccess {
      books: BookData,
   }

   axios.get<BooksSuccess>(baseUrl + '/assessment/students', {
      headers: {
         
      }
   })
      .then((response) => {
         dispatch(setNewBookData(response.data.books))
      })
      .catch((error: AxiosError) => {
         // TODO: error handling
         console.log(error)
         dispatch(setFailedRetrievingBookData(true))
      })
      .then(() => {
         dispatch(setRetrievingBookData(false))
      })
}