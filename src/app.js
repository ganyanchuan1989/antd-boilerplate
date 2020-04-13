/* 入口启动文件 */
import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'antd';
import { HashRouter as Router, Route } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';

if (__DEV__) {
	console.info('[当前环境] 开发环境');
}
if (__PROD__) {
	console.info('[当前环境] 线上环境');
}

// ================================
// 将根组件挂载到 DOM，启动！
// ================================
function loadIndex() {
	ReactDOM.render(
		<LocaleProvider>
			<Router>
				<div>
					<Route path="/" component={BasicLayout} />
				</div>
			</Router>
		</LocaleProvider>,
		document.getElementById('app')
	);
}

loadIndex();

import 'ASSET/less/normalize.less';
import 'ASSET/less/index.less';
