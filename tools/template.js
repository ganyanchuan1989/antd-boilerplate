const ROUTE_TEMPLATE = `import lazyLoad from '../layouts/lazyLoad';

export default {
  {routes}
};
`;

const PAGE_TEMPLATE = `import React, {{ Component }} from 'react';
{tmpImport}

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
			if (!err) {{
				console.log('Received values of form: ', values);
			}}
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
				{tmpFormButton}	
				</Row>
				</Form>
			</div>
		);
	}}
}}

export default Form.create()({tmpClsname});
`;

module.exports = {
    ROUTE_TEMPLATE,
    PAGE_TEMPLATE,
};
