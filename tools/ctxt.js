// const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const format = require('string-format');
const glob = require('glob');
const prettier = require('prettier');

// Resource Path
const ROUTES_PATH = path.resolve(__dirname, '../src/routes/routes.js');
const VIEW_DIR = path.resolve(__dirname, '../src/views/');
const SERVICE_DIR = path.resolve(__dirname, '../src/services/');

// Template files
const { ROUTE_TEMPLATE, PAGE_TEMPLATE, SERVICE_TEMPLATE, WELCOME_TEMPLATE } = require('./template');

// pages
let pages = [];
glob.sync('./cfg/*.txt').forEach((filePath) => {
  pages.push({...path.parse(filePath), filePath});
});

console.log(pages);

// 字段索引 Field1, Field2
let Fld_Idx = 0;

// ====================================
// 页面生成核心方法
// ====================================
generatePages(pages);
generateRoutes(pages);
generateServices(pages);
generateIndexPageBtns(pages);

// 生成routes
function generateRoutes(pages) {
	let routesStr = '';
		pages.forEach((page) => {
			const {name } = page;
			routesStr += `'/${name}': {
		module: lazyLoad(() => import('VIEW/${name}/index')),
		},\n`;
		});

		console.log('routesStr', routesStr);

		routesStr = format(ROUTE_TEMPLATE, {routes: routesStr});
		routesStr = prettier.format(routesStr, { semi: true, parser: 'babel', singleQuote: true });
		fs.writeFileSync(ROUTES_PATH, routesStr, 'utf8');
}


function generatePages(pages) {
	pages.forEach((page) => {
		const {filePath, name} = page;
		const lineStr = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
		const lines = lineStr.split('\n');
		generatePage(name, lines);
	});
}

function generatePage(pageName, lines) {
	Fld_Idx = 0;
	const importAntdStr = generateImportAntd(lines);
	// console.log(importAntdStr);
	const importServiceStr = generateImportService(pageName);
	// console.log(importServiceStr);
	const serviceActionStr = generateServiceAction(pageName);
	// console.log(serviceActionStr);
	const formStr = generatePageForm(lines);
	// console.log(formStr);
	const btnStr = generatePageFormButton(lines);
	// console.log(btnStr);


	let pageStr = format(PAGE_TEMPLATE, {
		tmpImportAntd: importAntdStr,
		tmpImportService: importServiceStr,
		tmpServiceAction: serviceActionStr,
		tmpClsname: pageName,
		tmpForm: formStr,
		tmpFormButton: btnStr,
	});

	pageStr = prettier.format(pageStr, { semi: true, parser: 'babel', singleQuote: true });
	const parentDir = path.join(VIEW_DIR, pageName);
	const pagePath = path.join(parentDir, '/index.js');
	if (!fs.existsSync(parentDir)) {
		fs.mkdirSync(parentDir);
	}
	fs.writeFileSync(pagePath, pageStr, 'utf8');
}

function generatePageForm(lines) {
	let formStr = '';
	lines.forEach((line) => {
		if (line.indexOf('-') === -1) formStr += generateFields(line);
	});

	return formStr;
}

function generateFields(line) {
	let formStr = '';
  const fields = line.split('|');
  const col = 24 / fields.length;
  fields.forEach((field) => {
		Fld_Idx++; // 字段索引
		const required = field.indexOf('*') > -1;
		const infos = field.split('/');
		let label = infos[0].trim();
		label = required ? label.substring(1) : label;
		const type = infos[1].trim();
		let values = [];
		if (type === 'checkbox' || type === 'radio' || type === 'select') {
			values = infos[2].split(',');
		}
		if (type === 'input' || type === 'password') formStr += generatePageFormItemInput({label, required, type, col, index: Fld_Idx});
		if (type === 'textarea') formStr += generatePageFormItemTextArea({label, required, type, col, index: Fld_Idx});
		if (type === 'checkbox') formStr += generatePageFormItemCheckbox({label, required, type, col, index: Fld_Idx, values});
		if (type === 'radio') formStr += generatePageFormItemRadio({label, required, type, col, index: Fld_Idx, values});
		if (type === 'select') formStr += generatePageFormItemSelect({label, required, type, col, index: Fld_Idx, values});
	});

	return formStr;
}


function generatePageFormItemInput({required, label, type, col, index }) {
	let inputStr = `
							<Col span={${col}}>
								<Form.Item label="${label}">
									{getFieldDecorator('Field${index}', {
										rules: [
											{
												required: ${required},
											},
										],
									})(<Input placeholder="Username" type="${type}" />)}
								</Form.Item>
							</Col>`;
	return inputStr;
}


function generatePageFormItemTextArea({required, label, col, index }) {
	let areaStr = `
							<Col span={${col}}>
								<Form.Item label="${label}">
									{getFieldDecorator('Field${index}', {
										rules: [
											{
												required: ${required},
											},
										],
									})(<Input.TextArea placeholder="Username"/>)}
								</Form.Item>
							</Col>`;
	return areaStr;
}


function generatePageFormItemCheckbox({label, required, col, index, values}) {
	let valueStr = '';
	values.forEach((value) => {
		valueStr += `	<Col span={6}>
										<Checkbox value="${value}">${value}</Checkbox>
									</Col>
									`;
	});
	// valueStr = rmLastLine(valueStr);

	return `				
					<Col span={${col}}>
						<Form.Item label="${label}">
							{getFieldDecorator('Field${index}', {
								rules: [
									{
										required: ${required},
									},
								],
							})(
							<Checkbox.Group style={{ width: '100%' }}>
								<Row>
								${valueStr}
								</Row>
							</Checkbox.Group>
							)}
						</Form.Item>
					</Col>
	`;
}

function generatePageFormItemRadio({ label, required, col, values, index }) {
	let valueStr = '';
	values.forEach((value) => {
		valueStr += `	<Radio value="${value}">${value}</Radio>
							`;
	});

	return `				
					<Col span={${col}}>
						<Form.Item label="${label}">
							{getFieldDecorator('Field${index}', {
								rules: [
									{
										required: ${required},
									},
								],
							})(
							<Radio.Group>
							${valueStr}
							</Radio.Group>
							)}
						</Form.Item>
					</Col>
	`;
}

function generatePageFormItemSelect({label, required, col, index, values}) {
	let valueStr = '';
	values.forEach((value) => {
		valueStr += `	<Select.Option value="${value}">${value}</Select.Option>
								`;
	});
	return `				
					<Col span={${col}}>
						<Form.Item label="${label}">
							{getFieldDecorator('Field${index}', {
								rules: [
									{
										required: ${required},
									},
								],
							})(
								<Select>
								${valueStr}
								</Select>
							)}
						</Form.Item>
					</Col>
	`;
}

function generateServiceAction(pageName) {
	// tmpServiceAction
	return `${pageName}Service.action(values);`;
} 

function generateImportService(pageName) {
	return `import ${pageName}Service from 'SERVICE/${pageName}Service';`;
}

function generateImportAntd(lines) {
	let compStr = '';
	lines.forEach((line) => {
		const subLines = line.split('|');
		subLines.forEach((subLine) => {
				const type = subLine.split('/')[1];
		if ((type == 'input' || type == 'password' || type == 'textarea') && compStr.indexOf('Input') < 0)
			compStr += ', Input'; // 输入框
		if (type == 'checkbox' && compStr.indexOf('Checkbox') < 0)
			compStr += ', Checkbox'; // 复选框
		if (type == 'radio' && compStr.indexOf('Radio') < 0) compStr += ', Radio'; // 单选框
		if (type == 'select' && compStr.indexOf('Select') < 0)
			compStr += ', Select'; // 下拉框
		});
	});
	compStr += ' ';
	return `import { Row, Col, Button, Form${compStr}} from 'antd';`;
}

function generatePageFormButton(lines) {
	let btnStr = '<Button type="primary" style={{ marginRight: 8 }} htmlType="submit">提交</Button>';

	return btnStr;
}

function generateServices(pages) {
	pages.forEach((page) => {
		const {name, filePath} = page;
		const lineStr = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
		const lines = lineStr.split('\n');
		generateService(name, lines);
	});
}

function generateService(pageName, lines) {
	const actionLine = lines.filter((line) => line.indexOf('-') > -1)[0];
	let serviceStr = format(SERVICE_TEMPLATE, {
		tmpServiceName: `${pageName}Service`,
		tmpUrl: actionLine.substring(1),
	});

	const servicePath = path.join(SERVICE_DIR, pageName + 'Service.js');
	serviceStr = prettier.format(serviceStr, { semi: true, parser: 'babel', singleQuote: true });
	fs.writeFileSync(servicePath, serviceStr, 'utf8');
}


function generateIndexPageBtns(pages) {
	let welBtnsStr = '';
	pages.forEach((page) => {
		const { name } = page;
		welBtnsStr += `	<p>
						<Link to="${name}">${name}</Link>
					</p>
					`;
	});

	
	welBtnsStr = format(WELCOME_TEMPLATE, {tmpBtns: welBtnsStr});
	welBtnsStr = prettier.format(welBtnsStr, { semi: true, parser: 'babel', singleQuote: true });
	const welPath = path.join(VIEW_DIR, 'index.js');
	fs.writeFileSync(welPath, welBtnsStr, 'utf8');
}
