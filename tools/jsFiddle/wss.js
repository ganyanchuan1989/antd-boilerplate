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
			const pageStr = generateDemoPage('JSFiddleDemo', lines);
			wsc.send(pageStr);
		}
	});
});
