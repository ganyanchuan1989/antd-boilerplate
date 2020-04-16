
const PAGE_TEMPLATE = `import React, {{ Component }} from 'react';
{tmpImportAntd}
import styles from '../index.less';

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
			<div className={{styles.FormContainer}}>
				<Form onSubmit={{this.handleSubmit}}>
					<Row>
						{tmpForm}
					</Row>
					<Row>
						<Form.Item label=" " colon={{false}} className={{styles.FormItem}}>
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
