import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import './index.scss';
import { postLogin } from './service';
import { ParamsType } from './types';
import { history } from 'umi';
interface LoginValues {
  userName: string;
  passWord: string;
}
interface LoginBack {
  accessToken: string;
  code: number;
  message: string;
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [form] = Form.useForm();
  const [formTip, setFormTip] = useState({
    isShowTip: false,
    tipContent: '',
  });
  const onFinish = (values: LoginValues) => {
    console.log('Success:', values);
    postLogin(values)
      .then((data: LoginBack) => {
        const { code, accessToken, message } = data;
        if (code === 200000) {
          localStorage.setItem('accessToken', accessToken);
          history.push('/home');
        } else {
          setFormTip({
            isShowTip: true,
            tipContent: message,
          });
        }
      })
      .catch(err => {})
      .finally(() => {});
  };

  const onFill = () => {
    console.log('onFill....');
    form.setFieldsValue({
      userName: '185217985@qq.com',
      passWord: '111111',
    });
  };

  return (
    <>
      {formTip.isShowTip && <Alert message={formTip.tipContent} type="error" />}
      <Form
        {...layout}
        name="Login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="userName"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="passWord"
          name="passWord"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
