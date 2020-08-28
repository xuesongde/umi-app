import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import './index.scss';
import { postRegister } from './service';
import { ParamsType } from './types';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const onFinish = (values: any) => {
    values.isAgreed = +values.isAgreed;
    console.log('Received values of form: ', values);
    postRegister(values)
      .then((data: object) => {
        console.log('register callback...', data);
      })
      .finally(() => {});
  };

  return (
    <div className="register_container">
      <div className="trade_mark">
        <img
          src={require('./images/logo_wolf.jpg')}
          alt=""
          className="mark_image"
        />
      </div>
      <div className="form_container">
        <Form
          className="form_style"
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="userName"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="passWord"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete="new_password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('passWord') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    'The two passwords that you entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new_password" />
          </Form.Item>
          <Form.Item
            name="isAgreed"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Should accept agreement'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox
              checked={checked}
              onChange={e => {
                console.log(e);
                setChecked(e.target.checked);
              }}
            >
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={!checked}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default RegistrationForm;
