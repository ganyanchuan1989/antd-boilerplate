import React, { Component } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import {message} from 'antd';

export default class CodeDemo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			code: window.localStorage.getItem('cfgCode'),
		};
	}

	convert = () => {
		const { code } = this.state;
		const { ws } = this.props;
		if (ws && ws.readyState === 1) {
			window.localStorage.setItem('cfgCode', code);
			// 发送页面生成指令
			ws.send(
				JSON.stringify({
					cmd: 'go',
					code,
				})
			);
			message.info('指令发送成功');
		} else {
			message.error('服务器已经断开');
		}
	};

	codeChange = (e) => {
		const value = e.target.value;
		this.setState({ code: value });
	};

	render() {
		const { ws } = this.props;
		const connected = ws ? ws.readyState === 1 : false;
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<p className={classnames(styles.panelHeader, styles.flex)}>
					<span className={styles.title} style={{flex: 1}}>配置文件编辑区</span>
					<span className={styles.cStatus} style={{color: connected ? 'green' : 'red'}}>{connected ? '已连接' : '断开'}</span>
					<span style={{flex: 1}} >
						<button className={styles.btnConvert} onClick={this.convert}>
							GO
						</button>
					</span>
				</p>
				<div className={styles.panelBody}>
					<textarea
						className={styles.editor}
						value={this.state.code}
						onChange={this.codeChange}
					></textarea>
				</div>
			</div>
		);
	}
}
