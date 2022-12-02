import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import axios from 'axios';
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import { store } from '../App';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate()
const {products,token,userData} = useContext(store)
const [salesData,setSalesData] = useState([])
const [ordertimeline,setordertimeline] = useState([])
const [countrySalesData,setcountrySalesData] = useState([])
const [seriessales,setseriessales] = useState([])
const getSales = async ()=>{
 await axios.get("http://localhost:8000/categorySales")
  .then(res=>setSalesData(res.data.salesDetails)).catch(err=>console.log(err))
}

const getCountrySales = async ()=>{
 await axios.get("http://localhost:8000/countrySales")
  .then(res=>setcountrySalesData(res.data.countrySales)).catch(err=>console.log(err))
}

const getordertimeline = async ()=>{
  await axios.get("http://localhost:8000/ordertimeline")
  .then(res=>setordertimeline(res.data.list)).catch(err=>console.log(err))
}

const getseriessales = async ()=>{
  await axios.get("http://localhost:8000/seriessales")
  .then(res=>setseriessales(res.data.seriessaleslist)).catch(err=>console.log(err))
}
// http://localhost:8000/seriessales/
useEffect(()=>{
  getSales()
  getCountrySales()
  getordertimeline()
  getseriessales()
  if(!token){
    navigate('/login')
  }
},[])
  return (
    <>
      <Helmet>
        <title> Dashboard  </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi,{userData.name} Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Worth" total={products.TotalPrice === undefined ? 100000:products.TotalPrice } icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Sales"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: '2020',
                  type: 'column',
                  fill: 'solid',
                  data: [2300, 1100, 2200, 2700, 1300, 2200, 3700, 2100, 4400, 2200, 3000],
                },
                {
                  name: '2021',
                  type: 'area',
                  fill: 'gradient',
                  data: [4400, 5500, 4100, 6700, 2200, 4300, 2100, 4100, 5600, 2700, 4300],
                },
                {
                  name: '2022',
                  type: 'line',
                  fill: 'solid',
                  data: [3000, 2500, 3600, 3000, 4500, 3500, 6400, 5200, 5900, 3600, 3900],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Sales"
              salesData={salesData}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Sales in countries"
              subheader="(+43%) than last year"
              chartData={countrySalesData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['Electronics', 'Fashion', 'Footwear', 'Appliances', 'Grocery',"Travel"]}
              chartData={seriessales}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={ordertimeline}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 3234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 3412,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 4213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 4432,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
