import React, { Component } from 'react';
import * as Space from 'react-spaces';
import Editor from './Editor/index';
import Show from './Show/index';
import Code from './SourceCode/index';

const style = { background: '#1E1E1E', border: '2px solid #000', padding: 0 };

export default class jsFiddle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: window.innerHeight,
			sourceCode: window.localStorage.getItem('sourceCode'),
			ws: null,
		};

		const ws = new WebSocket('ws://127.0.0.1:12345/');
		ws.onopen = () => {
			console.log('ws', ws.readyState);
			if (ws.readyState === 1) {
				this.setState({ws});
			} else {
				console.log('WebSocket 建立连接异常');
			}
		};
		ws.onmessage = ({data}) => {
			console.log('sourceCode', data);
			this.setState({sourceCode: data});
			window.localStorage.setItem('sourceCode', data);
		};
		ws.onclose = () => {
			this.setState({ws});
		};
		// this.setState({ws});
	}
	render() {
		const { height } = this.state;
		return (
			<div>
				<Space.Fixed height={height}>
					<Space.Fill>
						<Space.LeftResizable size="40%" style={style}>
							<Editor ws={this.state.ws}></Editor>
						</Space.LeftResizable>
						<Space.Fill style={style}>
							<Show></Show>
						</Space.Fill>
					</Space.Fill>
					<Space.BottomResizable size="30%" style={style}>
						<Code sourceCode={this.state.sourceCode}></Code>
					</Space.BottomResizable>
				</Space.Fixed>
			</div>
		);
	}
}
