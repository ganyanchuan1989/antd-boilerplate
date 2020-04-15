import React, { Component } from 'react';
import styles from './index.less';

export default class CodeDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: window.localStorage.getItem('cfgCode'),
		}; 	
	}

	convert=() => {
		const {code} = this.state;
		const {ws} = this.props;
		window.localStorage.setItem('cfgCode', code);
		// 发送页面生成指令
		ws.send(JSON.stringify({
			cmd: 'go',
			code,
		}));
		
	}

	codeChange=(e) => {
		const value = e.target.value;
		this.setState({code: value});
	}

	render() {
		return (
			<div style={{width: '100%', height: '100%'}}>
				<p className={styles.panelHeader}>
					<span className={styles.title}>配置文件编辑区</span>
					<button className={styles.btnConvert} onClick={this.convert}>GO</button>
				</p>
        <div className={styles.panelBody}>
          <textarea className={styles.editor} value={this.state.code} onChange={this.codeChange}></textarea>
        </div>
			</div>
		);
	}
}
