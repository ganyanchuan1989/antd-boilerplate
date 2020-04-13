
const format = require('string-format');
format.extend(String.prototype, {});
const str = `
class FormDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			obj: {},
		};
    }
    {aaa}
`;
// const user = {firstName: 'aa', lastName: 'b'};

console.log(format(str, 'vvvv'));
// const str = format(`"{} {firstName}
// {lastName}" <{email}>`, user);
// console.log(format('Hello, {}!', 'Alice'));
// console.log('Hello, {}!'.format('Alice'));

// const {ROUTE_TEMPLATE} = require('./template');
// console.log(ROUTE_TEMPLATE);
