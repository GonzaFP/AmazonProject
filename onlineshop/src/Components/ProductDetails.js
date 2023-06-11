/*
  !component displays more info about a product.  
*/

import React,{useState,useEffect,useContext} from 'react'
import { useParams } from 'react-router-dom'
import  fetcher  from '../fetcher'
import {useDispatch} from 'react-redux'
import { AddToBasket } from '../Contexts/dispatchContext'
import 
{
  ProductContainer,
  ProductTitle,
  ProductContent,
  ProductImage,
  ProductInfo,
  ShoppingButtons,
  DeliveryInfo,
  ProductDescription
} from './Styles/productDetails'


function ProductDetails() {
 const [productData,setProductData] = useState({errorMessage:'', data:{}})
  const {productId} = useParams()
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchProduct = async ()=>{
    const ProductData = await fetcher(`products/${productId}`)
    setProductData(ProductData)
  }
  fetchProduct()
  
},[productId])

const CreateMarkUp = () =>{
  return {__html:productData.data?.description}
}
  const {id,title,image,specs,features,stock,price} = productData.data
  let featuresData = features?.map((item,index)=><li key={index}>{item}</li>)

  return(
    <ProductContainer>
      <ProductTitle>
        <h3>{title}</h3>
      </ProductTitle>
      
      <ProductContent>
        <ProductImage src={`..//assets/${image}`} alt=''/>
        <ProductInfo>
          <h4>Dimensions</h4>
          <p id='dimension'>{specs?.dimensions}</p>
            {features && 
              <div>
              <h4>Features</h4>
              <ul id='features'>
              {featuresData}
              </ul>
              </div>
          }
        </ProductInfo>

        <ProductInfo>
          <h3> $ {price}</h3>
          <ShoppingButtons>
            <DeliveryInfo>
              <p>{`Stock Level: ${stock}`}</p>
              <p>Free Delivery.</p>
            </DeliveryInfo>
            <button onClick={()=>{
              dispatch(AddToBasket({id,title,qty:1,price,image}))
            }}>Add to Basket</button>
          </ShoppingButtons>
        </ProductInfo>

      </ProductContent>
      <ProductDescription dangerouslySetInnerHTML={CreateMarkUp()}></ProductDescription>
    </ProductContainer>
)
}

export default ProductDetails