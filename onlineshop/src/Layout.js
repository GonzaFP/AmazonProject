import React, {useReducer ,useState,useEffect} from 'react'
import Header from "./Components/Header"
import { Outlet } from 'react-router-dom'
import { initialState } from './Contexts/dispatchContext'
import SubHeader from './Components/SubHeader'
import fetcher from './fetcher'


function Layout() {
  const [categories, setCategories] = useState({errorMessage:'', data:[]})
  useEffect(()=>{
    const fetchData = async()=>{
    const categoryData = await fetcher('categories')
    setCategories(categoryData) 
  }
  fetchData()
  },[])
  return (
    <>
      <Header/>
      <SubHeader categories={categories}/>
      <Outlet/>
    </>
  )
}

export default Layout