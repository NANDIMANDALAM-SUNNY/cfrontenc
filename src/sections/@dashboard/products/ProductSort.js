import { useState } from 'react';
import { Menu, Button, MenuItem, Typography } from '@mui/material';
import Iconify from '../../../components/iconify';



export default function ShopProductSort({sort,setSort}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };


  const onArrowChange = ()=>{
    if(sort.order==='asc'){
      setSort({sort:sort.sort,order:"desc"})
    }
    else{
      setSort({sort:sort.sort,order:"asc"})

    }
  }

  return (
    <>
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {
            sort.order==="desc"?"Oldest":"Newest"
          }
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
          <MenuItem
            onClick = {onArrowChange}
            sx={{ typography: 'body2' }}
            
          >
              {
            sort.order==="asc"?"Oldest":"Newest"
          }
          </MenuItem>
      </Menu>
    </>
  );
}
