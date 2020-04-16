const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 12345 });

const generateDemoPage = require('./go');

wss.on('connection', (wsc) => {
  // console.log(wsc);
	wsc.on('message', (data) => {
		const obj = JSON.parse(data);
		const { cmd, code } = obj;
		if (cmd === 'go') {
      console.log('data', data);
			const lines = code.split('\n');
			const pageStr = generateDemoPage('JSFiddleDemo', rmEmptyLine(lines));
			wsc.send(pageStr);
		}
	});
});

function rmEmptyLine(lines) {
	// 过滤空行
	lines = lines.filter((line) => line !== null && line.trim() !== '');
	// console.log('lines', lines);
	return lines;
}
