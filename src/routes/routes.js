import lazyLoad from '../layouts/lazyLoad';

export default {
  '/P100': {
    module: lazyLoad(() => import('VIEW/P100/index')),
  },
  '/P110': {
    module: lazyLoad(() => import('VIEW/P110/index')),
  },
};
