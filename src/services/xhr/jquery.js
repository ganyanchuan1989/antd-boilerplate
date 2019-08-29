import { errHandler, localMock } from './config';

const xhr = ({
	url,
	body = {},
	method = 'post',
	showErr = true,
	isMask = false,
}) => {
	const defer = $.Deferred();
	let isMock = localMock && __DEV__;
	$.ajax({
		type: isMock ? 'get' : method,
		url: url,
		contentType: 'application/json;charset=UTF-8',
		data: JSON.stringify({
			reqHead: {
				tranProcess: '',
				tranId: '',
			},
			reqBody: body,
		}),
		beforeSend: (request) => {
			// request.setRequestHeader('portToken', getUserToken());
		},
	})
		.done((rs) => {
			let res = typeof rs == 'string' ? JSON.parse(rs) : rs;
			let RSP_HEAD = res.RSP_HEAD;

			if (RSP_HEAD.TRAN_SUCCESS === '1') {
				return defer.resolve(res.rspBody);
			} else {
				if (showErr) {
					errHandler(RSP_HEAD);
				}
				return defer.reject(RSP_HEAD);
			}
		})
		.fail((err) => {
			if (showErr) {
				errHandler(err);
			}
			return defer.reject(err);
		});

	return defer.promise();
};

export default xhr;
