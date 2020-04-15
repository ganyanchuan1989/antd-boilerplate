// const glob = require('glob');
// const path = require('path');

// const pages = [];
// glob.sync('./cfg/*.txt').forEach((filePath) => {
//   pages.push({...path.parse(filePath), filePath});
// });

// console.log(pages);


let inputStr = `
  <Col span={}>
    <Form.Item label="">
      {getFieldDecorator('Field', {
        rules: [
          {
            required: '',
          },
        ],
      })(<Input placeholder="Username" type="" />)}
    </Form.Item>
  </Col>
  `;
          
function rmFirstLine(x) {
    console.log(x.lastIndexOf('\n') > 0, x.indexOf('\n') > 0);
    if (x.indexOf('\n') > 0) {
      return x.substring(x.indexOf('\n') + 1);
    } else {
      return x;
    }
  }
  
function rmLastLine(x) {
  if (x.lastIndexOf('\n') > 0) {
    return x.substring(0, x.lastIndexOf('\n'));
  } else {
    return x;
  }
}

console.log(rmLastLine(inputStr));
console.log(rmFirstLine(inputStr));
