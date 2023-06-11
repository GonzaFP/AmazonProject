
import styled from 'styled-components'

export const ProductContainer = styled.div`
  color: darkcyan;
  margin-top: 25px;
  margin-left: 10px;
  grid-area: main;
  
`
export const ProductTitle = styled.div`
  font-weight:bold;
  font-size:15px;
  padding-left:10px
`
export const ProductImage = styled.img`
  
    width: 250px;

`

export const ProductContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 20px;
  margin-top: 50px;
`
export const ProductInfo = styled.div`
  li, p{
  color: black;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
  }
`
export const ShoppingButtons = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  button{
  width: 100px;
  padding: 2px;
  margin: 5px;
  border-radius: 5px;
  border-color: #ccc;
  }
`
export const DeliveryInfo = styled.div`
  background-color: rgb(180, 175, 175);
  width: 120px;
  color: black;
  font-weight: bold;
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px 5px 8px 5px;
  border-radius: 5px;
`
export const ProductDescription = styled.p`
  color:black;
`