import {
  useSelector,
  useDispatch
} from "react-redux"
import { retrieveBookData } from "../actions/bookData/bookData"
import { State } from "../redux"


const useLoadBookData = () => {
  const retrievingBookData = useSelector((state: State) => state.bookData.retrievingBookData)
  const failedRetrievingBookData = useSelector((state: State) => state.bookData.failedRetrievingBookData)
  const bookData = useSelector((state: State) => state.bookData.bookData)

  const dispatch = useDispatch()

  if (!bookData && !retrievingBookData) {
    dispatch(retrieveBookData())
  }

  return {
    retrievingBookData: !bookData || retrievingBookData,
    failedRetrievingBookData,
    bookData,
  }
}

export default useLoadBookData
