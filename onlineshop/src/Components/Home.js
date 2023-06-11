import React from 'react'
import './Styles/Home.css'
import Product from './Product'
import DoubleProducts from './doubleProducts'
import LongProduct from './longProduct'
import Slider from './Slider'
function Home() {
  
  const longImages = ['hill', 'monk', 'oliver', 'taylor','atomic','daughter']
  return (
    <div className='home'>
      
  <div className='homecontainer'>
      <Slider />

      <div className='row'>
        <Product
          id={22}
          title="Gift your grad TVs & more" 
          image='..//assets/10221968.jfif'
          subtitle='Enhance your home'
          />

          <Product
          id={21}
          title="Deals on top brands"
          image='ipad.jpg' 
          subtitle='See more'
        />
        
        <Product
          id={18}
          title="Customers' most loved" 
          image='..//assets/watch.webp'
          subtitle='Discover items with 4+ stars'
          />

          <div className='other'>
              <Product
              className='perfume'
                id={20}
                title='Celebrate Family with a gift' 
                image='secret.jpg'
                subtitle='Shop the selection'
              />
              <Product
              className='blender'
                id={19}
                title='Professional manufacture mixeur juicer smoothie maker blender.' 
                image='blender.jpg'
                subtitle='see more'
              />
          </div>
      </div>

      <div className='row'>
        <Product
          id={21}
          title="New & pre-loved styles"
          image='..//assets/heels.jpg' 
          subtitle='Shop now'
        />

        <DoubleProducts
          id={22}
          title="Best Sellers in Outlet" 
          image1='..//assets/fashion.jpg'
          image2='..//assets/fashion2.avif'
          image3='..//assets/fashion3.jpg'
          image4='..//assets/fashion4.jpg'
          subtitle='Shop rent the runway'
          />
        <Product
          id={18}
          title="Just in: Summer make-up" 
          image='..//assets/makeup.jpg'
          subtitle='Discover more'
          />
              <Product
                id={20}
                title='"Murder in Bermuda"' 
                image='..//assets/murder.jpg'
                subtitle='Listen now on Audible'
              />
      </div>

        <LongProduct image={longImages}/>
    </div>
    </div>
  )
}

export default Home