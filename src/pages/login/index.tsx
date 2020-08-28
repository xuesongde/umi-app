import React from 'react';
import './index.scss';
import { postLogin } from './service';
import { ParamsType } from './types';

class Login extends React.Component {
  componentDidMount() {
    postLogin({ userName: 'xsd', passWord: '123456' });
  }
  render() {
    return (
      <div className="normal">
        <h1 className="title">Login page</h1>
      </div>
    );
  }
}
export default Login;
