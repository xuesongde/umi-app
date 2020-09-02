import React from 'react';
import Home from './home';
import './index.scss';
import { createLogger } from 'redux-logger';
import { message } from 'antd';
export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
class App extends React.Component {
  // the entry page
  render() {
    return <Home />;
  }
}
export default App;
