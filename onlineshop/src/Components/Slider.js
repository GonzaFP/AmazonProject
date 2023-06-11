import React,{useState} from 'react'
import { SliderData } from './SliderData'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Styles/Slider.css'

function Slider() {
 const [current, setSlider] = useState(0)
 const length = SliderData.length
 const nextSlide = ()=>{
  setSlider(current === length - 1? 0: current + 1)
 }
 const prevSlide = ()=>{
  setSlider(current === 0? length - 1: current - 1)
 }
  return (
   <section className='slider'>
    <ArrowForwardIosIcon className=' prev' onClick={prevSlide}/>
    <ArrowBackIosIcon className='next' onClick={nextSlide}/>
    {
     SliderData.map((slide,index)=>{
      return (
       <div className={index === current? 'slide active': 'slide'} key={index}>
        {index === current && <img src={slide.image} alt='' className='banner'/>}
       </div>
      )
     })
    }
    </section>
  )
}

export default Slider