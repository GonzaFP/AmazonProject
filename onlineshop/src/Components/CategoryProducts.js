import React, { useEffect,useState } from 'react'
import fetcher from '../fetcher'
import {useParams} from 'react-router-dom'
import Products from './Products'
import './Styles/productsStyles.css'

function CategoryProducts() {
  const {categoryId} = useParams()
  const [categoryProducts, setProducts] = useState({errorMessage: '', data:[]})

  useEffect(()=>{
  const fetchData = async ()=>{
  const response = await fetcher(`products?catId=${categoryId}`)
    setProducts(response)
  }
  fetchData()
},[categoryId])
const newArray = []
const handleData = ()=>{
  for (let i = 0; i < categoryProducts.data.length - 1; i+=2){
    const pairs = [categoryProducts.data[i], categoryProducts.data[i+1]]
    newArray.push(pairs)
  }
  if (categoryProducts.data.length % 2 !== 0){
    newArray.push([categoryProducts.data[categoryProducts.data.length - 1]])
  }
}
handleData()
console.log(newArray)
let productdata  = 
              categoryProducts.errorMessage? 
              `Error: ${categoryProducts.errorMessage}` 
              :newArray
  return (
  <>
    <div>Results</div>
    <div className='rows'>
      {
        productdata.map(item=>{
          if (item.length === 2){
            const [item1,item2] = item
          return (
            <div className='row'>
            <Products item={item1}/>
            <Products item={item2}/>
            </div>
          )
          }else{
            const [item1] = item
          return(
            <div className='row'>
            <Products item = {item1}/>
            </div>
          )
          }
        })
      }
    </div>
    </>
  )
}

export default CategoryProducts