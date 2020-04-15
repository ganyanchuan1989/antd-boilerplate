import React from 'react';
import { Link } from 'react-router-dom';

const tStyle = {
  textAlign: 'center',
  height: 100,
  fontSize: 40,
  lineHeight: '100px',
};

class Welcome extends React.Component {
  jumpToUrl = (url) => {
    const { history } = this.props;
    history.push({ pathname: url });
  };
  render() {
    return (
      <div>
        <p style={tStyle}>页面生成工具</p>
        <div>
          <p>
            <Link to="P110">P110</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default Welcome;
