const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const format = require('string-format');

// Resource Path
const ROUTES_PATH = path.resolve(__dirname, '../src/routes/routes.js');
const VIEW_DIR = path.resolve(__dirname, '../src/views/');
const SERVICE_DIR = path.resolve(__dirname, '../src/services/');

// Template files
const { ROUTE_TEMPLATE, PAGE_TEMPLATE, SERVICE_TEMPLATE } = require('./template');

// Get document, or throw exception on error
try {
	const pages = yaml.safeLoad(
		fs.readFileSync(path.resolve(__dirname, './schema.yml'), 'utf8')
	);
	generateRoutes(pages);
} catch (e) {
	console.log(e);
}

// 生成routes
function generateRoutes(pages) {
	let routes_str = '';
		pages.forEach((page) => {
			generatePage(page.page);
			const { routepath } = page.page;
			console.log(routepath);
			routes_str += `'${routepath}': {
		module: lazyLoad(() => import('VIEW${routepath}/index')),
	},\n`;
		});

		routes_str = format(ROUTE_TEMPLATE, {routes: routes_str});

		fs.writeFileSync(ROUTES_PATH, routes_str, 'utf8');
}

// 生成页面
function generatePage(page) {
	generateService(page);
	const { clsname, form } = page;
	const importAntdStr = generateImportAntd(form);
	const importServiceStr = generateImportService(page);
	const serviceActionStr = generateServiceAction(page);
	// console.log(importStr);
	const formStr = generatePageForm(form);
	// console.log(formStr);
	const btnStr = generatePageFormButton(form);
	// console.log(btnStr);

	const pageStr = format(PAGE_TEMPLATE, {
		tmpImportAntd: importAntdStr,
		tmpImportService: importServiceStr,
		tmpServiceAction: serviceActionStr,
		tmpClsname: clsname,
		tmpForm: formStr,
		tmpFormButton: btnStr,
	});

	const parentDir = path.join(VIEW_DIR, clsname);
	const pagePath = path.join(parentDir, '/index.js');
	if (!fs.existsSync(parentDir)) {
		fs.mkdirSync(parentDir);
	}
	fs.writeFileSync(pagePath, pageStr, 'utf8');
}

function generateImportAntd(form) {
	let compStr = '';
	const { formitems } = form;
	formitems.forEach((item) => {
		const { type } = item;
		if ((type == 'input' || type == 'password') && compStr.indexOf('Input') < 0)
			compStr += ', Input'; // 输入框
		if (type == 'checkbox' && compStr.indexOf('Checkbox') < 0)
			compStr += ', Checkbox'; // 复选框
		if (type == 'radio' && compStr.indexOf('Radio') < 0) compStr += ', Radio'; // 单选框
		if (type == 'select' && compStr.indexOf('Select') < 0)
			compStr += ', Select'; // 下拉框
	});

	compStr += ' ';
	return `import { Row, Col, Button, Form${compStr}} from 'antd';`;
}

function generatePageFormButton(form) {
	const { btns } = form;
	let btnStr = '';
	btns.forEach((btn) => {
		const { type, label } = btn;
		if (type === 'reset') {
			btnStr += `	<Button type="primary" style={{ marginRight: 8 }} onClick={this.handleReset}>${label}</Button>
					`;
		} else {
			btnStr += `	<Button type="primary" style={{ marginRight: 8 }} htmlType="${type}">${label}</Button>
					`;
		}
	});

	btnStr = rmLastLine(btnStr);
	return btnStr;
}

function generatePageForm(form) {
	const { formitems } = form;
	let form_str = '';
	formitems.forEach((item) => {
		const { type } = item;
		if (type === 'input' || type == 'password') form_str += generatePageFormItemInput(item);
		if (type === 'checkbox') form_str += generatePageFormItemCheckbox(item);
		if (type === 'radio') form_str += generatePageFormItemRadio(item);
		if (type === 'select') form_str += generatePageFormItemSelect(item);
	});
	return rmLastLine(form_str);
}

function generatePageFormItemInput(item) {
	const { type, name, label, required, message, col } = item;
	return `	<Col span={${col}}>
            <Form.Item label="${label}">
							{getFieldDecorator('${name}', {
								rules: [
									{
										required: ${required},
										message: '${message}',
									},
								],
							})(<Input placeholder="Username" type="${type}" />)}
            </Form.Item>
					</Col>
	`;
}

function generatePageFormItemCheckbox(formitem) {
	const { name, label, required, message, col, values } = formitem;
	let valueStr = '';
	values.forEach((valueItem) => {
		const { label, value } = valueItem;
		valueStr += `	<Col span={6}>
										<Checkbox value="${value}">${label}</Checkbox>
									</Col>
									`;
	});
	valueStr = rmLastLine(valueStr);

	return `				<Col span={${col}}>
						<Form.Item label="${label}">
							{getFieldDecorator('${name}', {
								rules: [
									{
										required: ${required},
										message: '${message}',
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

function generatePageFormItemRadio(formItem) {
	const { name, label, required, message, col, values } = formItem;
	let valueStr = '';
	values.forEach((valueItem) => {
		const { label, value } = valueItem;
		valueStr += `	<Radio value="${value}">${label}</Radio>
							`;
	});
	valueStr = rmLastLine(valueStr);

	return `				<Col span={${col}}>
						<Form.Item label="${label}">
							{getFieldDecorator('${name}', {
								rules: [
									{
										required: ${required},
										message: '${message}',
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

function generatePageFormItemSelect(formItem) {
	const { name, label, required, message, col, values } = formItem;
	let valueStr = '';
	values.forEach((valueItem) => {
		const { label, value } = valueItem;
		valueStr += `	<Select.Option value="${value}">${label}</Select.Option>
								`;
	});
	valueStr = rmLastLine(valueStr);

	return `				<Col span={${col}}>
						<Form.Item label="${label}">
							{getFieldDecorator('${name}', {
								rules: [
									{
										required: ${required},
										message: '${message}',
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

function rmLastLine(x) {
	if (x.lastIndexOf('\n') > 0) {
    return x.substring(0, x.lastIndexOf('\n'));
	} else {
		return x;
	}
}

function generateImportService(page) {
	const { clsname } = page;
	return `import ${clsname}Service from 'SERVICE/${clsname}Service';`;
}

function generateServiceAction(page) {
	// tmpServiceAction
	const { clsname } = page;
	return `${clsname}Service.action(values);`;
} 

function generateService(page) {
	const {clsname, form} = page;
	const { btns } = form;
	let subBtn = btns.filter((btn) => (btn.type === 'submit'))[0];
	const {action} = subBtn;

	const pageStr = format(SERVICE_TEMPLATE, {
		tmpServiceName: `${clsname}Service`,
		tmpUrl: action,
	});


	const servicePath = path.join(SERVICE_DIR, clsname + 'Service.js');
	fs.writeFileSync(servicePath, pageStr, 'utf8');
}
