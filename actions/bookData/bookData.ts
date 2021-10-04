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
import { API_KEY } from '@env'


export const retrieveBookData = (searchTerm?: string): StandardThunk => (dispatch) => {
   dispatch(setRetrievingBookData(true))
   dispatch(setFailedRetrievingBookData(false))

   interface BooksSuccess {
      items: BookData[],
   }

   axios.get<BooksSuccess>(baseUrl + 'volumes', {
      params: {
         key: API_KEY,
         q: searchTerm || 'landscape'
      }
   })
      .then((response) => {
         dispatch(setNewBookData(response.data.items))
      })
      .catch((error: AxiosError) => {
         // TODO: error handling
         dispatch(setFailedRetrievingBookData(true))
      })
      .then(() => {
         dispatch(setRetrievingBookData(false))
      })
}