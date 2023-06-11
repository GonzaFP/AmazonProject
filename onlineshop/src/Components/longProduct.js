import React from 'react'
import { ProductImg} from './Styles/styles'
function LongProduct(props) {
 const [img1,img2,img3,img4,img5,img6] = props.image
 const baseUrl = '..//assets/'

  return (
   <>
     <div className='main'>
      <h3>Best Sellers in Books</h3>
      <div className='theimage'>
     <img className='img' src={baseUrl+img1+'.jpg'} alt=''/>
     <img className='img' src={baseUrl+img2+'.jpg'} alt=''/>
     <img className='img' src={baseUrl+img3+'.jpg'} alt=''/>
     <img className='img' src={baseUrl+img4+'.jpg'} alt=''/>
     <img className='img' src={baseUrl+img5+'.jpg'} alt=''/>
     <img className='img' src={baseUrl+img6+'.jpg'} alt=''/>
     </div>
     </div>
    </>
  )
}

export default LongProduct