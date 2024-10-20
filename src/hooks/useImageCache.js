//hook to cache images in session storage
import moment from 'moment'

export default function useImageCache(image){
    if(!image){
        return ''
    }
    const query = new URLSearchParams(image)
    const imgLocation = image.split('?')[0]
    let currentImageUrl = image
    const imageObject = JSON.parse(sessionStorage.getItem(imgLocation))
    if(imageObject !== null){
      const { expiry, date, imgUrl } = imageObject
      const imgDate = new Date(moment(date).format()).getTime()
      const expiryDate = moment(imgDate + parseInt((expiry - (60*60)) * 1000))
      if(moment() > expiryDate){
        //update cache
        const imgCreatedDate = query.get('X-Amz-Date')
        const imgExpiry = query.get('X-Amz-Expires')
        sessionStorage.setItem(imgLocation, JSON.stringify({
          expiry: imgExpiry,
          date: imgCreatedDate,
          imgUrl: image,
        }))
      }else{
        //not expired
        currentImageUrl = imgUrl
      }
    }else{
      //add to cache
      const imgCreatedDate = query.get('X-Amz-Date')
      const imgExpiry = query.get('X-Amz-Expires')
      sessionStorage.setItem( imgLocation, JSON.stringify({
        expiry: imgExpiry,
        date: imgCreatedDate,
        imgUrl: image,
      }))
    }

    return currentImageUrl
}