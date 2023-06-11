import {configureStore} from '@reduxjs/toolkit'
import ReducerFunction from '../Contexts/dispatchContext'

export const store = configureStore({
 reducer:{
  mainReducer:ReducerFunction
 }
})
