const baseUrl = 'http://localhost:3001/'

const fetcher = async (url)=>{
 let responseObject = {
  errorMessage:'',
  data:[]
 }
 try{
  const response = await fetch(baseUrl + url)
  if(response.status === 404){
   throw new Error(`${response.status} Page not found.`)
  }else if (response.status === 500){
   throw new Error('Server Error')
  }else if(!response.ok){
  throw new Error(`Http Error! status: ${response.status}`)
 }

 const responseData = await response.json()
 responseObject.data = responseData
 }
 catch(error){
  responseObject.errorMessage = error
 }
 return responseObject
} 

export default fetcher