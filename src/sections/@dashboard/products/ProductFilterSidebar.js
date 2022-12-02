import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  TextField,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';
import styles from './styles.module.css'
// ----------------------------------------------------------------------


export const FILTER_GENDER_OPTIONS = ['Men', 'Women', 'Kids'];

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};



export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter ,setSearch, filterGenre, setFilterGenre, genres}) {
 
  const onChange =  ({currentTarget:input})=>{
    if(input.checked){
      const state = [...filterGenre,input.value]
      setFilterGenre(state)
    }
    else{
      const state = filterGenre.filter((val)=>val!==input.value)
      setFilterGenre(state)
    }
  }
  return (
    <>
     <TextField id="outlined-basic" label="Search by Name" variant="outlined" onChange={(e)=>setSearch(e.target.value)}/>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
               Categories
              </Typography>
                {genres&& genres?.map((item) => (
                  <div className={styles.genre_container}>
                  <input key={item} type="checkbox" onChange={onChange} value={item}  />
                  <p className={styles.genre_label}>{item}</p>
                  </div>
                ))}
            </div>


          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
