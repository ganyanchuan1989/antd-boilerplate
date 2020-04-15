import React, { Component } from 'react';
import * as Space from 'react-spaces';
import Editor from './Editor/index';
import Show from './Show/index';
import Code from './Code/index';

const style = { background: '#1E1E1E', border: '2px solid #000', padding: 0 };

export default class jsFiddle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: window.innerHeight,
		};
	}
	render() {
		const { height } = this.state;
		return (
			<div>
				<Space.Fixed height={height}>
					<Space.Fill>
						<Space.LeftResizable size="40%" style={style}>
							<Editor></Editor>
						</Space.LeftResizable>
						<Space.Fill style={style}>
							<Show></Show>
						</Space.Fill>
					</Space.Fill>
					<Space.BottomResizable size="30%" style={style}>
						<Code></Code>
					</Space.BottomResizable>
				</Space.Fixed>
			</div>
		);
	}
}
