import React,{useState,createContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

export const store = createContext();

export default function App() {
  const [products,setProducts] = useState({})
  const [token,setToken] = useState(localStorage.getItem('jwt-token'));
  const [userData,setUserData] = useState({})

  return (
    <store.Provider  value={{products,setProducts,token,setToken,userData,setUserData}}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </store.Provider>
  );
}
