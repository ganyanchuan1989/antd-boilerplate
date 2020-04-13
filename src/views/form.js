import React, { Component } from 'react';
import { Row, Col, Button, Form, Icon, Input, Select, Radio, Checkbox } from 'antd';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

class FormDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			obj: {},
		};
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	};
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Form {...formItemLayout} onSubmit={this.handleSubmit}>
					<Row>
						<Col span={24}>
							<Form.Item label="用户名：">
								{getFieldDecorator('username', {
									initialValue: '111',
									rules: [
										{
											required: true,
											message: 'Please input your username!',
										},
									],
								})(<Input placeholder="Username" />)}
							</Form.Item>
						</Col>
						<Form.Item label="密码：">
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: 'Please input your Password!',
									},
								],
							})(
								<Input
									prefix={
										<Icon
											type="lock"
											style={{ color: 'rgba(0,0,0,.25)' }}
										/>
									}
									type="password"
									placeholder="Password"
								/>
							)}
						</Form.Item>
						<Form.Item label="Error">
							{getFieldDecorator('select', {
								initialValue: '1',
								rules: [
									{
										required: true,
										message: 'Please select your country!',
									},
								],
							})(
								<Select>
									<Select.Option value="1">Option 1</Select.Option>
									<Select.Option value="2">Option 2</Select.Option>
									<Select.Option value="3">Option 3</Select.Option>
								</Select>
							)}
						</Form.Item>
						<Form.Item label="Radio.Group">
							{getFieldDecorator('radio-group')(
								<Radio.Group>
									<Radio value="a">item 1</Radio>
									<Radio value="b">item 2</Radio>
									<Radio value="c">item 3</Radio>
								</Radio.Group>
							)}
						</Form.Item>
						<Form.Item label="Checkbox.Group">
							{getFieldDecorator('checkbox-group', {
								initialValue: ['A', 'B'],
							})(
								<Checkbox.Group style={{ width: '100%' }}>
									<Row>
										<Col span={8}>
											<Checkbox value="A">A</Checkbox>
										</Col>
										<Col span={8}>
											<Checkbox disabled value="B">
												B
											</Checkbox>
										</Col>
										<Col span={8}>
											<Checkbox value="C">C</Checkbox>
										</Col>
										<Col span={8}>
											<Checkbox value="D">D</Checkbox>
										</Col>
										<Col span={8}>
											<Checkbox value="E">E</Checkbox>
										</Col>
									</Row>
								</Checkbox.Group>
							)}
						</Form.Item>
						<Form.Item label=" " colon={false}>
							<Button
								type="primary"
								htmlType="submit"
							>
								Log in
							</Button>
						</Form.Item>
					</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create({ name: 'normal_login' })(FormDemo);
