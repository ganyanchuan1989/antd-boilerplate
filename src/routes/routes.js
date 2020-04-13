import lazyLoad from '../layouts/lazyLoad';

export default {
  '/page1': {
		module: lazyLoad(() => import('VIEW/page1/index')),
	},

};
