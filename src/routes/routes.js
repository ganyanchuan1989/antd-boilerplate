import lazyLoad from '../layouts/lazyLoad';

export default {
  P110: {
    module: lazyLoad(() => import('VIEWP110/index')),
  },
};
