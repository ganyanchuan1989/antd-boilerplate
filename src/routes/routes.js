import lazyLoad from '../layouts/lazyLoad';

export default {
  '/page1': {
		module: lazyLoad(() => import('VIEW/page1/index')),
	},
'/page2': {
		module: lazyLoad(() => import('VIEW/page2/index')),
	},

};
