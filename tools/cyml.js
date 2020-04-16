const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const format = require('string-format');
const prettier = require('prettier');

// Resource Path
const ROUTES_PATH = path.resolve(__dirname, '../src/routes/routes.js');
const VIEW_DIR = path.resolve(__dirname, '../src/views/');
const SERVICE_DIR = path.resolve(__dirname, '../src/services/');

// Template files
const { ROUTE_TEMPLATE, PAGE_TEMPLATE, SERVICE_TEMPLATE, WELCOME_TEMPLATE } = require('./template');

// Get document, or throw exception on error
try {
	const pages = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, './schema.yml'), 'utf8'));
	generateRoutes(pages);
	generateServices(pages);
	generatePages(pages);
	generateIndexPageBtns(pages);
} catch (e) {
	console.error(e);
}

// 生成routes
function generateRoutes(pages) {
	let routesStr = '';
		pages.forEach((page) => {
			const { routepath } = page.page;
			console.log(routepath);
			routesStr += `'${routepath}': {
		module: lazyLoad(() => import('VIEW${routepath}/index')),
	},\n`;
		});

		routesStr = format(ROUTE_TEMPLATE, {routes: routesStr});
		routesStr = prettier.format(routesStr, { semi: true, parser: 'babel', singleQuote: true });
		fs.writeFileSync(ROUTES_PATH, routesStr, 'utf8');
}

// 生成services
function generateServices(pages) {
	pages.forEach((page) => {
		generateService(page.page);
	});
}

// 生成pages
function generatePages(pages) {
	pages.forEach((page) => {
		generatePage(page.page);
	});
}

// 生成页面
function generatePage(page) {
	const { clsname, form } = page;
	const importAntdStr = generateImportAntd(form);
	const importServiceStr = generateImportService(page);
	const serviceActionStr = generateServiceAction(page);
	// console.log(importStr);
	const formStr = generatePageForm(form);
	// console.log(formStr);
	const btnStr = generatePageFormButton(form);
	// console.log(btnStr);

	let pageStr = format(PAGE_TEMPLATE, {
		tmpImportAntd: importAntdStr,
		tmpImportService: importServiceStr,
		tmpServiceAction: serviceActionStr,
		tmpClsname: clsname,
		tmpForm: formStr,
		tmpFormButton: btnStr,
	});

	pageStr = prettier.format(pageStr, { semi: true, parser: 'babel', singleQuote: true });

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
		if ((type == 'input' || type == 'password' || type == 'textarea') && compStr.indexOf('Input') < 0)
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

	return btnStr;
}

function generatePageForm(form) {
	const { formitems } = form;
	let formStr = '';
	formitems.forEach((item) => {
		const { type } = item;
		if (type === 'input' || type == 'password') formStr += generatePageFormItemInput(item);
		if (type === 'textarea') formStr += generatePageFormItemTextArea(item);
		if (type === 'checkbox') formStr += generatePageFormItemCheckbox(item);
		if (type === 'radio') formStr += generatePageFormItemRadio(item);
		if (type === 'select') formStr += generatePageFormItemSelect(item);
	});
	return formStr;
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
							})(<Input placeholder="请输入${label}" type="${type}" />)}
            </Form.Item>
					</Col>
	`;
}


function generatePageFormItemTextArea(item) {
	const { name, label, required, message, col } = item;
	let areaStr = `
							<Col span={${col}}>
								<Form.Item label="${label}">
									{getFieldDecorator('${name}', {
										rules: [
											{
												required: ${required},
												message:'${message}'
											},
										],
									})(<Input.TextArea placeholder="请输入${label}"/>)}
								</Form.Item>
							</Col>`;
	return areaStr;
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
								<Select placeholder="请选择${label}">
								${valueStr}
								</Select>
							)}
						</Form.Item>
					</Col>
	`;
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

	let serviceStr = format(SERVICE_TEMPLATE, {
		tmpServiceName: `${clsname}Service`,
		tmpUrl: action,
	});

	serviceStr = prettier.format(serviceStr, { semi: true, parser: 'babel', singleQuote: true });
	
	const servicePath = path.join(SERVICE_DIR, clsname + 'Service.js');
	fs.writeFileSync(servicePath, serviceStr, 'utf8');
}


function generateIndexPageBtns(pages) {
	let welBtnsStr = '';
	pages.forEach((page) => {
		const { clsname, routepath } = page.page;
		welBtnsStr += `	<p>
						<Link to="${routepath}">${clsname}</Link>
					</p>
					`;
	});

	welBtnsStr = format(WELCOME_TEMPLATE, {tmpBtns: welBtnsStr});
	const welPath = path.join(VIEW_DIR, 'index.js');
	fs.writeFileSync(welPath, welBtnsStr, 'utf8');
}
