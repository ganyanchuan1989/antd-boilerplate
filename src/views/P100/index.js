import React, { Component } from 'react';
import { Row, Col, Button, Form, Checkbox, Radio, Select, Input } from 'antd';
import P100Service from 'SERVICE/P100Service';

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

class P100 extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        P100Service.action(values);
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
              <Form.Item label="姓名">
                {getFieldDecorator('Field1', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input placeholder="Username" type="input" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="密码">
                {getFieldDecorator('Field2', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input placeholder="Username" type="password" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="爱好">
                {getFieldDecorator('Field3', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Row>
                      <Col span={6}>
                        <Checkbox value="羽毛球">羽毛球</Checkbox>
                      </Col>
                      <Col span={6}>
                        <Checkbox
                          value="乒乓球
"
                        >
                          乒乓球
                        </Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="性别">
                {getFieldDecorator('Field4', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value="男">男</Radio>
                    <Radio
                      value="女
"
                    >
                      女
                    </Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="好友">
                {getFieldDecorator('Field5', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select>
                    <Select.Option value="lili"></Select.Option>
                    <Select.Option
                      value="lucy
"
                    >
                      {' '}
                      <Select.Option value="lili"></Select.Option>
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Input.TextArea placeholder="Username" />
            
          </Row>
          <Row>
            <Form.Item label=" " colon={false}>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                htmlType="submit"
              >
                提交
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(P100);
