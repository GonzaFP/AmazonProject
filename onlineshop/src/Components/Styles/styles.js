import styled from 'styled-components'

export const ProductInfo = styled.div`
 display: flex;
 flex-direction: ${({flex})=>flex || 'column'};
 align-items: center;
 justify-content: flex-end;
 margin: 10px;
 padding: 20px;
 width: 100%;
 max-width: 250px;
 background-color:white;
 z-index: 1;
 max-height:${({height})=>height || '600px'};

 h4{
  font-size:18px;
 }
`
export const ProductImg = styled.img`
 max-height:${({height})=>height || '350px'};
 width: 100%;
 object-fit: contain;
 margin-bottom: 15px;
`