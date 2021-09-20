// RTK's slices are not likely to create overlapping action names (`slicename/reducerkey`),
// but they cannot overlap if the names are unique
enum SliceNames {
  BOOK_DATA = "BOOK_DATA"
}
 
export default SliceNames
 