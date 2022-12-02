import { Button, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import FileBase64  from 'react-file-base64'
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const CreateOrUpdate = () => {
  const {id} = useParams()
    const navigate = useNavigate()
  const [img,setImg] = useState("")
  const initialState = {
    productName:"",
    description:"",
    price:0,
    instock:0,
    category:"",
    image:""
  };
  const [data,setData] = useState({
   initialState
  })

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value,image:img})
  }


    const handleChangeImage =async (e)=>{
      setImg(e.target.value, e.target.value);
    }
 
  const handleSubmit =async ()=>{
    
      await axios.post("http://localhost:8000/product/addproduct",data)
      .then((res)=>{
        console.log(res)
         setData({ ...initialState })
        });
  }

  return (
   <>
<Grid container spacing={2}>
  <Grid item xs={6}>
  <TextField type='text' name='productName' sx={{width:"400px"}} label="product Name" variant="outlined" value={data.productName} onChange={handleChange} />
  </Grid>
  <Grid item xs={6}>
  <TextField type='text' name='description' sx={{width:"400px"}}   label="product Description" variant="outlined"  value={data.description} onChange={handleChange} />
  </Grid>
  <Grid item xs={6}>
  <FileBase64 type="file" name='image' multiple={false} onDone={({base64}) => setImg( base64)}  onChange={handleChangeImage}/>

  </Grid>
  <Grid item xs={6}>
  <TextField type='number' name='price' sx={{width:"400px"}}  label="Price" variant="outlined"  value={data.price} onChange={handleChange} />
  </Grid>
  <Grid item xs={6}>
  <TextField type='number' name='instock' sx={{width:"400px"}}   label="In Stock" variant="outlined"   value={data.instock} onChange={handleChange} />
  </Grid>
  <Grid item xs={6}>
  <TextField type='text' name='category' sx={{width:"400px"}}   label="Category" variant="outlined"  value={data.category} onChange={handleChange} />
  </Grid>
  <Button onClick={handleSubmit}>Add Product</Button>
</Grid>
      
   </>
  )
}

export default CreateOrUpdate

