import React from 'react'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import { AddToBasket } from '../Contexts/dispatchContext'


function Products(props) {
    const {id,title,image,price} = props.item
    const dispatch = useDispatch()
  return (
    <div className='product'>

      <div className='productinfo'>
        <Link to={`/products/${id}`}><p>{title}</p></Link>
      <p className='price'>
      <small>$</small>
      <strong>{price}</strong>
      </p>
      <div className='rating'>
      {
        Array(5).fill().map((_, i)=>(
          <p>⭐</p>
        ))
      }
      </div>
    </div>
      <Link to={`/products/${id}`}><img src={`..//assets/${image}`} className='productimg' alt=''/></Link>
      
      <button className='productbutton' onClick={()=>{
        dispatch(AddToBasket({id,title,price,image,qty:1}))
      }}>Add to basket</button>
    </div>
  )
}

export default Products