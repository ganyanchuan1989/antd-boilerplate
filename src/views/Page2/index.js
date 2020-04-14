import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, Radio, Select } from 'antd';
import Page2Service from 'SERVICE/Page2Service';

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

class Page2 extends Component {
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
				Page2Service.action(values);
			} else {
				console.log(err);
			}
		});
  };

  handleReset = () => {
    this.props.form.resetFields();
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
								rules: [
									{
										required: true,
										message: '请输入用户名!',
									},
								],
							})(<Input placeholder="Username" type="input" />)}
            </Form.Item>
					</Col>
		<Col span={24}>
            <Form.Item label="密码：">
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: '请输入密码!',
									},
								],
							})(<Input placeholder="Username" type="password" />)}
            </Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="爱好：">
							{getFieldDecorator('likes', {
								rules: [
									{
										required: false,
										message: 'undefined',
									},
								],
							})(
							<Checkbox.Group style={{ width: '100%' }}>
								<Row>
									<Col span={6}>
										<Checkbox value="1">羽毛球</Checkbox>
									</Col>
										<Col span={6}>
										<Checkbox value="2">乒乓球</Checkbox>
									</Col>
								</Row>
							</Checkbox.Group>
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="性别：">
							{getFieldDecorator('sex', {
								rules: [
									{
										required: true,
										message: '请选择性别!',
									},
								],
							})(
							<Radio.Group>
								<Radio value="0">男</Radio>
								<Radio value="1">女</Radio>
							</Radio.Group>
							)}
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label="朋友：">
							{getFieldDecorator('friend', {
								rules: [
									{
										required: true,
										message: '请选择朋友!',
									},
								],
							})(
								<Select>
									<Select.Option value="Lucy">Lucy</Select.Option>
									<Select.Option value="Jack">Jack</Select.Option>
									<Select.Option value="Jack2">Jack2</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Form.Item label=" " colon={false}>
						<Button type="primary" style={{ marginRight: 8 }} htmlType="submit">submit</Button>
						<Button type="primary" style={{ marginRight: 8 }} onClick={this.handleReset}>reset</Button>
					</Form.Item>
				</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create()(Page2);
