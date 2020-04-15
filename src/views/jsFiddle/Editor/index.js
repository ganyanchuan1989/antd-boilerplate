import React, { Component } from 'react';
import styles from './index.less';

export default class CodeDemo extends Component {
	render() {
		return (
			<div style={{width: '100%', height: '100%'}}>
				<p className={styles.panelHeader}>
					<span className={styles.title}>配置文件编辑区</span>
					<button className={styles.btnConvert}>GO</button>
				</p>
        <div className={styles.panelBody}>
          <textarea className={styles.editor}>ddd</textarea>
        </div>
			</div>
		);
	}
}
