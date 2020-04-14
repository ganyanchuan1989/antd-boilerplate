const ROUTE_TEMPLATE = `import lazyLoad from '../layouts/lazyLoad';

export default {
  {routes}
};
`;

const PAGE_TEMPLATE = `import React, {{ Component }} from 'react';
{tmpImportAntd}
{tmpImportService}

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
				{tmpServiceAction}
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


const SERVICE_TEMPLATE = `import xhr from './xhr/';

class {tmpServiceName} {
	action(param) {
		return xhr({
			method: 'post',
			url: '{tmpUrl}',
			body: param,
			showErr: false,
		});
	}
}

// 实例化后再导出
export default new {tmpServiceName}();
`;

module.exports = {
    ROUTE_TEMPLATE,
		PAGE_TEMPLATE,
		SERVICE_TEMPLATE,
};
