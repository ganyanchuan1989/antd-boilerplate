import React from 'react';
import {Link} from 'react-router-dom';

const tStyle = {textAlign: 'center', height: 100, fontSize: 40, lineHeight: '100px'};
const bStyle = {padding: '0 40px'};
class Welcome extends React.Component {
  
  jumpToUrl=(url) => {
    const {history} = this.props;
    history.push({pathname: url});
  }
  render() {
    return (
      <div>
				<p style={tStyle}>页面生成工具</p>
        <div style={bStyle}>
					<p>
						<Link to="/page1">Page1</Link>
					</p>
						<p>
						<Link to="/page2">Page2</Link>
					</p>
        </div>
      </div>
    );
  }
}
export default Welcome;
