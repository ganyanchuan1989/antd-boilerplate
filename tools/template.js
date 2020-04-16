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
		sm: {{ span: 6 }},
	}},
	wrapperCol: {{
		xs: {{ span: 24 }},
		sm: {{ span: 12 }},
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


const WELCOME_TEMPLATE = `import React from 'react';
import {{Link}} from 'react-router-dom';

const tStyle = {{textAlign: 'center', height: 100, fontSize: 40, lineHeight: '100px'}};
const bStyle = {{ width: 600, margin: 'auto'}};

class Welcome extends React.Component {{
  
  jumpToUrl=(url) => {{
    const {{history}} = this.props;
    history.push({{pathname: url}});
  }}
  render() {{
    return (
      <div>
				<p style={{tStyle}}>页面生成工具</p>
				<div style={{bStyle}}>
					<Link to="/jsFiddle">jsFiddle</Link>
				{tmpBtns}
        </div>
      </div>
    );
  }}
}}
export default Welcome;
`;

module.exports = {
    ROUTE_TEMPLATE,
		PAGE_TEMPLATE,
		SERVICE_TEMPLATE,
		WELCOME_TEMPLATE,
};
