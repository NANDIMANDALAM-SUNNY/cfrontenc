import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container,Grid,  Stack, Typography,Box, Card, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar,Pagination } from '../sections/@dashboard/products';
import { store } from '../App';


const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// mock


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
const {products,setProducts} = useContext(store)

 
 
  const [sort, setSort] = useState({ sort: "createdAt", order: "desc" });
	const [filterGenre, setFilterGenre] = useState("");
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("");
  console.log(search)
  const getAllPrducts = async ()=>{
    try {
      const url = `http://localhost:8000/product/getproducts?category=${filterGenre.toString()}&page=${page}&search=${search}&sort=${sort.sort},${sort.order}`
      const {data} = await axios.get(url)
      setProducts(data)
    } catch (error) {
      console.log(error)
    }
  }

useEffect(() => {
  getAllPrducts()
}, [sort, filterGenre, page, search])

console.log(products)

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              setSearch = {(search)=>setSearch(search)}
              filterGenre={filterGenre}
              genres={products.category?products.category:[]}
              setFilterGenre={(genre)=>setFilterGenre(genre)}
            />
            <ProductSort sort={sort} setSort={(sort)=>setSort(sort)}  />
          </Stack>
        </Stack>


     
        <Grid container spacing={3} >
        {products && products?.getproducts?.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
        <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={product.productName} src={product.image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="subtitle2" noWrap>
            {product.productName}
          </Typography>
     

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {/* {fCurrency(price)} */}
          </Typography>
        </Stack>
      </Stack>
    </Card>
        </Grid>
      ))}
      </Grid>
      </Container>
      <Pagination 
      total={products.total?products.total:0}
      limit={products.limit?products.limit:0}
      page={page}
      setPage={(page)=>setPage(page)}
         />
    </>
  );
}
