import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, Radio, Select } from 'antd';

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

class Page1 extends Component {
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
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
					<Col span={8}>
            <Form.Item label="用户名：">
							{getFieldDecorator('username', {
								initialValue: '',
								rules: [
									{
										required: true,
										message: 'Please input your username!',
									},
								],
							})(<Input placeholder="Username" type="input" />)}
            </Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="爱好：">
							{getFieldDecorator('likes', {
								rules: [
									{
										required: true,
										message: 'undefined',
									},
								],
							})(
							<Checkbox.Group style={{ width: '100%' }}>
								<Row>
									<Col span={8}>
										<Checkbox value="1">羽毛球</Checkbox>
									</Col>
										<Col span={8}>
										<Checkbox value="2">乒乓球</Checkbox>
									</Col>
								</Row>
							</Checkbox.Group>
							)}
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="性别：">
							{getFieldDecorator('sex', {
								rules: [
									{
										required: true,
										message: 'undefined',
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
					<Col span={8}>
						<Form.Item label="朋友：">
							{getFieldDecorator('friend', {
								initialValue: '1',
								rules: [
									{
										required: true,
										message: 'undefined',
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
					<Button type="primary" style={{ marginRight: 8 }} htmlType="submit">submit</Button>
					<Button type="primary" style={{ marginRight: 8 }} onClick={this.handleReset}>reset</Button>
					<Button type="primary" style={{ marginRight: 8 }} onClick={this.handleReset}>reset</Button>
					<Button type="primary" style={{ marginRight: 8 }} onClick={this.handleReset}>reset</Button>	
				</Row>
				</Form>
			</div>
		);
	}
}

export default Form.create()(Page1);
