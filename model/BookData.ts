export type BookData = {
   accessInfo: {}
   etag: string
   id: string
   kind: string
   saleInfo: {}
   searchInfo: {}
   selfLink: string
   volumeInfo: {
       title: string
       subtitle: string
       authors: string
       categories: string[]
       description: string,
       imageLinks: {
           smallThumbnail: string
           thumbnail: string
       }
       infoLink: string
       pageCount: number
       previewLink: string
       publishedDate: string // 2014-10-10
       publisher: string
   }
}