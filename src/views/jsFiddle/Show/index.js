import React, { Component } from 'react';
import styles from './index.less';

export default class CodeDemo extends Component {
	render() {
		return (
			<div style={{ width: '100%', height: '100%' }}>
				<p className={styles.panelHeader}>
					<span className={styles.title}>展示区</span>
				</p>
				<div className={styles.panelBody}>
					<iframe
						src="http://localhost:9090/index.html#/jsFiddleDemo"
						width="100%"
						height="100%"
						style={{ border: 0, background: '#1E1E1E' }}
					></iframe>
				</div>
			</div>
		);
	}
}
