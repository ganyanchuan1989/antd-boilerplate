import React, { Component } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, Radio, Select } from 'antd';
import styles from '../index.less';

class JSFiddleDemo extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
      <div className={styles.FormContainer}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={8}>
              <Form.Item label="姓名" className={styles.FormItem}>
                {getFieldDecorator('Field1', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input type="input" placeholder="请输入姓名" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="密码" className={styles.FormItem}>
                {getFieldDecorator('Field2', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input type="password" placeholder="请输入密码" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="密码" className={styles.FormItem}>
                {getFieldDecorator('Field3', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input type="password" placeholder="请输入密码" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="爱好" className={styles.FormItem}>
                {getFieldDecorator('Field4', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                      <Checkbox value="羽毛球">羽毛球</Checkbox>
                      <Checkbox value="乒乓球">乒乓球</Checkbox>
                      <Checkbox value="篮球">篮球</Checkbox>
                    </div>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="爱好" className={styles.FormItem}>
                {getFieldDecorator('Field5', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <div style={{ display: 'flex' }}>
                      <Checkbox value="羽毛球">羽毛球</Checkbox>
                      <Checkbox value="乒乓球">乒乓球</Checkbox>
                      <Checkbox value="篮球">篮球</Checkbox>
                    </div>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="性别" className={styles.FormItem}>
                {getFieldDecorator('Field6', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio value="男">男</Radio>
                    <Radio value="女">女</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="好友" className={styles.FormItem}>
                {getFieldDecorator('Field7', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <Select placeholder="请选择好友">
                    <Select.Option value="lili">lili</Select.Option>
                    <Select.Option value="lucy">lucy</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="好友" className={styles.FormItem}>
                {getFieldDecorator('Field8', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select placeholder="请选择好友">
                    <Select.Option value="lili">lili</Select.Option>
                    <Select.Option value="lucy">lucy</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="好友" className={styles.FormItem}>
                {getFieldDecorator('Field9', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select placeholder="请选择好友">
                    <Select.Option value="lili">lili</Select.Option>
                    <Select.Option value="lucy">lucy</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="好友" className={styles.FormItem}>
                {getFieldDecorator('Field10', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select placeholder="请选择好友">
                    <Select.Option value="lili">lili</Select.Option>
                    <Select.Option value="lucy">lucy</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="简介" className={styles.FormItem}>
                {getFieldDecorator('Field11', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input.TextArea placeholder="请输入简介" />)}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="简介" className={styles.FormItem}>
                {getFieldDecorator('Field12', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input.TextArea placeholder="请输入简介" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item label=" " colon={false} className={styles.FormItem}>
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

export default Form.create()(JSFiddleDemo);
