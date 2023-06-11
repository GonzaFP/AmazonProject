import React,{useContext,useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { schema } from '../Features/Schema'
import {auth,db} from '../firebase'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../Contexts/dispatchContext'
import {
  createUserWithEmailAndPassword
} 
from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'

function SignUp() {
  const navigate = useNavigate()
  const {user} = useSelector(state=>state.mainReducer)
  const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null)
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  })

  const formSubmit = async (data)=>{
    const {email, password,name} = data
    try {
      const {user} = await createUserWithEmailAndPassword(auth,email,password)
      // await setDoc(doc(db,"users",user.uid),{email})
      if (user && user.email){
        navigate("/")
        dispatch(login({
            name:name,
            email:user.email,
            id:user.uid,
            photoUrl:user.photoURL||null
          }))
      }
    } catch (error) {
      const errorCode = error.code
      setErrorMessage(errorCode)
    }
  }

  return (
    <div>
    <section className='mainContainer'>
      <Link to='/'>
        <img src='amazonwhite.png' alt=''className='amazon'/>
      </Link>
      <div className='signInCard'>
        <h2>Create account</h2>
        {errorMessage && (<p>{errorMessage}</p>)}
        <form onSubmit={handleSubmit(formSubmit)}>

          <h5>Your name</h5>
          <input type='text' placeholder='Your first and last name' {...register('name')}/>
          <p className='error'>{errors.name?.message}</p>

          <h5>Email</h5>
            <input type='email' {...register("email")}/>
              <p className='error'>{errors.email?.message}</p>

          <h5>Password</h5>
            <input type='password' {...register("password")}/>
            <p className='error'>{errors.password?.message}</p>
            
            <h5>Confirm password</h5>
            <input type='password' {...register("confirmPassword")}/>
            <p className='error'>{errors.confirmPassword?.message}</p>

          <button className='signin'>Sign in</button>
        </form>
        
        <p className='account'>By creating an account, you agree to Amazon's <span className='terms'>Conditions of Use</span> and <span className='terms'>Privacy Notice</span>.</p>
        <p className='account'>Already have an account? <span> <Link to='/signin' className='terms'>Sign in</Link></span></p>
      </div>
    </section>
    </div>
  )
}

export default SignUp