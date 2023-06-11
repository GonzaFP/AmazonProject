import React from 'react'
import './Styles/ProductStyles.css'
import { ProductInfo,ProductImg } from './Styles/styles'
import {Link} from 'react-router-dom'

function Product({title,subtitle,image,className}) {
  return (
    <ProductInfo 
      height={className === 'perfume'? '80px': className === 'blender' &&'200px'}
      flex={className === 'perfume' && 'row'}
      >
      <h4>{title}</h4>
      <ProductImg src={image} alt='' height={className === 'perfume'? '60px': className === 'blender' &&'110px'}/>
      <Link to= '/cart'>{subtitle}</Link>
    
    </ProductInfo>
  )
}

export default Product