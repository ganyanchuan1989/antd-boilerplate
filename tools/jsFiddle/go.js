// const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const format = require('string-format');
const prettier = require('prettier');

// Resource Path
const JSFiddle_DEMO_PATH = path.resolve(__dirname, '../src/views/jsFiddle/demo.js');

// Template files
const { PAGE_TEMPLATE } = require('./template');

// 字段索引 Field1, Field2
let Fld_Idx = 0;

module.exports = function generateDemoPage (pageName, lines) {
	Fld_Idx = 0;
	const importAntdStr = generateImportAntd(lines);
	// console.log(importAntdStr);
	// const importServiceStr = generateImportService(pageName);
	// console.log(importServiceStr);
	// const serviceActionStr = generateServiceAction(pageName);
	// console.log(serviceActionStr);
	const formStr = generatePageForm(lines);
	// console.log(formStr);
	const btnStr = generatePageFormButton(lines);
	// console.log(btnStr);

	let pageStr = format(PAGE_TEMPLATE, {
		tmpImportAntd: importAntdStr,
		tmpClsname: pageName,
		tmpForm: formStr,
		tmpFormButton: btnStr,
	});

	pageStr = prettier.format(pageStr, {
		semi: true,
		parser: 'babel',
		singleQuote: true,
	});

	fs.writeFileSync(JSFiddle_DEMO_PATH, pageStr, 'utf8');
};

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
		const label = infos[0].trim();
		const type = infos[1].trim();
		let values = [];
		if (type === 'checkbox' || type === 'radio' || type === 'select') {
			values = infos[2].split(',');
		}
		if (type === 'input' || type === 'password')
			formStr += generatePageFormItemInput({
				label,
				required,
				type,
				col,
				index: Fld_Idx,
			});
		if (type === 'checkbox')
			formStr += generatePageFormItemCheckbox({
				label,
				required,
				type,
				col,
				index: Fld_Idx,
				values,
			});
		if (type === 'radio')
			formStr += generatePageFormItemRadio({
				label,
				required,
				type,
				col,
				index: Fld_Idx,
				values,
			});
		if (type === 'select')
			formStr += generatePageFormItemSelect({
				label,
				required,
				type,
				col,
				index: Fld_Idx,
				values,
			});
	});

	return formStr;
}

function generatePageFormItemInput({ required, label, type, col, index }) {
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

function generatePageFormItemCheckbox({ label, required, col, index, values }) {
	let valueStr = '';
	values.forEach((valueItem) => {
		const { label, value } = valueItem;
		valueStr += `	<Col span={6}>
										<Checkbox value="${value}">${label}</Checkbox>
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
	values.forEach((valueItem) => {
		const { label, value } = valueItem;
		valueStr += `	<Radio value="${value}">${label}</Radio>
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

function generatePageFormItemSelect({ label, required, col, index, values }) {
	let valueStr = '';
	values.forEach((valueItem) => {
		const { label, value } = valueItem;
		valueStr += `	<Select.Option value="${value}">${label}</Select.Option>
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
			if (
				(type == 'input' || type == 'password') &&
				compStr.indexOf('Input') < 0
			)
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
	let btnStr =
		'<Button type="primary" style={{ marginRight: 8 }} htmlType="submit">提交</Button>';

	return btnStr;
}
