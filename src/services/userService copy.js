import xhr from './xhr/';
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
			url: '/api/v2/loginController',
			body: userData,
			showErr: false,
		});
	}
}

// 实例化后再导出
export default new UserService();
