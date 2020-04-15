
const PAGE_TEMPLATE = `import React, {{ Component }} from 'react';
{tmpImportAntd}

const formItemLayout = {{
	labelCol: {{
		xs: {{ span: 24 }},
		sm: {{ span: 8 }},
	}},
	wrapperCol: {{
		xs: {{ span: 24 }},
		sm: {{ span: 16 }},
	}},
}};

class {tmpClsname} extends Component {{
  handleSubmit = (e) => {{
		e.preventDefault();
		this.props.form.validateFields((err, values) => {{
			if (!err) {
				console.log('Received values of form: ', values);
			} else {
				console.log(err);
			}
		}});
  }};

  handleReset = () => {{
    this.props.form.resetFields();
	}};

	render() {{
		const {{ getFieldDecorator }} = this.props.form;
		return (
			<div>
				<Form {{...formItemLayout}} onSubmit={{this.handleSubmit}}>
					<Row>
						{tmpForm}
					</Row>
					<Row>
						<Form.Item label=" " colon={{false}}>
						{tmpFormButton}
						</Form.Item>
					</Row>
				</Form>
			</div>
		);
	}}
}}

export default Form.create()({tmpClsname});
`;


module.exports = {
		PAGE_TEMPLATE,
};
