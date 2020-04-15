import lazyLoad from '../layouts/lazyLoad';

export default {
  '/P110': {
    module: lazyLoad(() => import('VIEW/P110/index')),
  },
};
