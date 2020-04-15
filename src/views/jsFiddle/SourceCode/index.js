import React, { Component } from 'react';
import styles from './index.less';
import {message} from 'antd';

export default class CodeDemo extends Component {
	copyHandle = () => {
		const textarea = document.createElement('textarea');
			document.body.appendChild(textarea);
			textarea.value = this.props.sourceCode;
			textarea.select();
			document.execCommand('copy');
			textarea.remove();

			message.info('复制成功');
	};
	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<p className={styles.panelHeader}>
					<span className={styles.title}>源码区</span>
					<button className={styles.btnConvert} onClick={this.copyHandle}>
						COPY
					</button>
				</p>
				<div className={styles.panelBody}>
					<div style={{ height: '100%', overflow: 'on' }}>
						<pre style={{ height: '100%', overflow: 'on' }}>
							<code>{this.props.sourceCode}</code>
						</pre>
					</div>
				</div>
			</div>
		);
	}
}
