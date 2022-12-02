// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: icon('ic_user'),
  },
  {
    title: 'Products',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Add product',
    path: '/dashboard/addproduct/:id',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },

];

export default navConfig;
