import xhr from './xhr/';
import { SERVER_URL } from 'CONFIG';

/**
 * 对应后端涉及到用户认证的 API
 */
class UserService {
	/**
	 * @param  {Object} userData
	 * @return {Promise}
	 */
	login(userData) {
		return xhr({
			method: 'post',
			url: `${SERVER_URL}api/v1/login`,
			body: userData,
			showErr: false,
		});
	}
}

// 实例化后再导出
export default new UserService();
