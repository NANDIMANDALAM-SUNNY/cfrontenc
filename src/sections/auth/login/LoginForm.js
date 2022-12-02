import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Iconify from '../../../components/iconify';
import { store } from '../../../App';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const {products,token,userData,setToken,setUserData} = useContext(store)
  const navigate = useNavigate();
  const [notification,setNotification] = useState("")
  const [data,setData] = useState({
    email:"",
    password:""
  })
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  };

  const handleClick =async ()=>{
    await axios.post("http://localhost:8000/users/login",data)
    .then((res)=>{
      setUserData(res.data)
      setToken(res.data.data)
      setNotification(res.data.message)
    }).catch((err)=>{
      toast.error("Error", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
    })
  }


  const notifications = (msg)=>{
    if(notification  === "Invalid Credentials"){
      toast.warning(notification, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
    else if (notification === "Authentication Failed"){
      toast.error("Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
    else if (notification === "Please Verify Your Account"){
      toast.error(notification, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
    else if (notification === "Logged in Succesfully"){
      toast.success(notification, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        setNotification("")
    }
  }
notifications()

if(token){
  localStorage.setItem('jwt-token',token);
  navigate('/')
} 

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={handleChange}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" onClick={()=>navigate('/forgotpassword')} >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
<ToastContainer />

    </>
  );
}
