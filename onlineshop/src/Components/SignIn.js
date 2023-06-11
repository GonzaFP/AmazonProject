import React, { useContext,useState,useEffect } from 'react'
import './Styles/SignInStyles.css'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import { schema } from '../Features/Schema'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth,db } from '../firebase'
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../Contexts/dispatchContext'
import { setDoc, doc } from 'firebase/firestore'

function SignIn() {
  const {user} = useSelector(state=>state.mainReducer)
  const dispatch = useDispatch()
  const [errorMessage,setErrorMessage] = useState(null)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  })

  const handleSignIn = async (event)=>{
    event.preventDefault()
    try {
      const {user} = await signInWithEmailAndPassword(auth,email,password)
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
      console.log(errorCode)
      setErrorMessage(errorCode)
    }
  }
  return (
    <section className='mainContainer'>
      <Link to='/'>
        <img src='amazonwhite.png' alt=''className='amazon'/>
      </Link>
      <div className='signInCard'>
        <h2>Sign in</h2>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        
        <form>
        <h5>Your name</h5>
          <input 
            type='text' 
            placeholder='Your first and last name' 
            value={name} 
            onChange={e=>setName(e.target.value)}/>
          <p className='error'>{errors.name?.message}</p>

          <h5>Email</h5>
            <input 
              type='email'
              name='email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
              <p className='error'>{errors.email?.message}</p>
          
          <h5>Password</h5>
            <input 
            type='password' 
            name='password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
            />
            <p className='error'>{errors.password?.message}</p>
          <button className='signin' type='submit' onClick={handleSignIn}>Sign in</button>
        </form>
        
        <p className='account'>By continuing, you agree to Amazon's <span className='terms'>Conditions of Use</span> and <span className='terms'>Privacy Notice</span>.</p>
      </div>

      <div className='new'>
        <p>New to Amazon?</p>
        <button className='newBtn' onClick={()=> navigate("/signup")}>Create your Amazon account</button>
      </div>
    </section>
  )
}

export default SignIn