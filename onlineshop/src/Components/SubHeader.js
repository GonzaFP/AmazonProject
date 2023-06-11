import React, { useState } from 'react'
import './Styles/SubHeaderStyles.css'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';


function SubHeader(props) {
const [className, setClassName] = useState('hide')
const [toggle, setToggle] = useState(false)
  const handleDisplay = ()=>{
  setClassName(()=>{
    return toggle? 'show': 'hide'
  })
  setToggle(!toggle)
  }
  let categories = props.categories.errorMessage? 
                  `Error: ${props.categories.errorMessage}`
                  :props.categories.data.map(category=>{
                  return <li key={category.id}>
                    <Link to={`category/${category.id}`} className='category'>{category.title}</Link>
                  </li>
                  })

  return (
    <div className='subheader'>
      <div className='menu' onClick={handleDisplay}>
        <MenuIcon/>
      <h4>Categories</h4>
      </div>
      <ul className={className}>
        {categories}
      </ul>
      </div>
  )
}

export default SubHeader