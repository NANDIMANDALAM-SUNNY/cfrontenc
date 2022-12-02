import React,{useState} from 'react'
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {  Stack, IconButton, InputAdornment,Typography,Box,Container, TextField, Checkbox, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase64  from 'react-file-base64'
import useResponsive from '../../../hooks/useResponsive';
import Logo from '../../../components/logo';
import Iconify from '../../../components/iconify';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
const Register = () => {
  const [img,setImg] = useState("")
    const mdUp = useResponsive('up', 'md');
   const [notification,setNotification] = useState("")
    const navigate = useNavigate();
    const initialState = {
      email:"",
      password:"",
      profile:"",
      passsword:""
    };
    const [data,setData] = useState(
      initialState
    )
      const [showPassword, setShowPassword] = useState(false);
    
      const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value,profile:img})
      };
    
      const handleChangeImage =async (e)=>{
        setImg(e.target.value, e.target.value);
      }

      const handleSubmit =async ()=>{
        await axios.post("http://localhost:8000/users/register",data)
        .then((res)=>{
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
        if(notification  === "User Already Exists"){
          toast.warning("User Already Exists", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(() => {
              navigate('/login')
          }, 3000);
            setNotification("")
        }
        else if (notification === "Error"){
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
        else if (notification === "Success"){
          toast.success("Please check your mail to confirm", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setTimeout(() => {
              navigate('/login')
          }, 3000);
            setNotification("")
        }
      }
    notifications()
console.log(notification)
  return (
<>      
<Helmet>
      <title> Register </title>
       </Helmet>

       <StyledRoot>
         <Logo
           sx={{
             position: 'fixed',
             top: { xs: 16, sm: 24, md: 40 },
             left: { xs: 16, sm: 24, md: 40 },
           }}
         />

         {mdUp && (
           <StyledSection>
             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
               Hi, Please register
             </Typography>
             <img src="/assets/illustrations/illustration_login.png" alt="login" />
           </StyledSection>
         )}

         <Container maxWidth="sm">
           <StyledContent>
             <Typography variant="h4" gutterBottom>
               Register here
             </Typography>
 <Link to="/login">

             <Typography variant="body2" sx={{ mb: 5 }}>
               Already have an account? {''}
               <Link variant="subtitle2" >Login Here</Link>
             </Typography>
 </Link>

            <Box>
            <Stack spacing={3}>
        <TextField name="name" label="Name" onChange={handleChange}/>

        <TextField name="email" label="Email address" onChange={handleChange}/>
        <FileBase64 type="file" name='image' multiple={false} onDone={({base64}) => setImg( base64)}  onChange={handleChangeImage}/>
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
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" onClick={handleSubmit} variant="contained" >
        Register
      </Button>
            </Box>
           </StyledContent>
         </Container>
       </StyledRoot>
<ToastContainer />

     </>
  )
}

export default Register



// // ----------------------------------------------------------------------

// export default function LoginPage() {
//   const mdUp = useResponsive('up', 'md');

//   return (
//     <>
//       <Helmet>
//         <title> Login | Minimal UI </title>
//       </Helmet>

//       <StyledRoot>
//         <Logo
//           sx={{
//             position: 'fixed',
//             top: { xs: 16, sm: 24, md: 40 },
//             left: { xs: 16, sm: 24, md: 40 },
//           }}
//         />

//         {mdUp && (
//           <StyledSection>
//             <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
//               Hi, Welcome Back
//             </Typography>
//             <img src="/assets/illustrations/illustration_login.png" alt="login" />
//           </StyledSection>
//         )}

//         <Container maxWidth="sm">
//           <StyledContent>
//             <Typography variant="h4" gutterBottom>
//               Please Log in
//             </Typography>
// <Link to="/register">

//             <Typography variant="body2" sx={{ mb: 5 }}>
//               Don’t have an account? {''}
//               <Link variant="subtitle2" >Get started</Link>
//             </Typography>
// </Link>

//             <LoginForm />
//           </StyledContent>
//         </Container>
//       </StyledRoot>
//     </>
//   );
// }
