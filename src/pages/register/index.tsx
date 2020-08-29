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
  Alert,
  message,
} from 'antd';
import './index.scss';
import { postRegister } from './service';
import { ParamsType } from './types';
import { history } from 'umi';

interface RegisterCallbackData {
  code: number;
  message: string;
}
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
  const [formTip, setFormTip] = useState({
    isShowTip: false,
    tipContent: '',
  });
  const onFinish = (values: any) => {
    values.isAgreed = +values.isAgreed;
    console.log('Received values of form: ', values);
    postRegister(values)
      .then((data: RegisterCallbackData) => {
        console.log('register callback...', data);
        const { code, message } = data;
        if (code === 200000) {
          history.push('/login');
        } else {
          setFormTip({
            isShowTip: true,
            tipContent: message,
          });
        }
      })
      .catch((err: Error) => {
        console.error(err);
      })
      .finally(() => {});
  };

  const onFill = () => {
    form.setFieldsValue({
      userName: '185217985@qq.com',
      passWord: '111111',
      confirm: '111111',
      isAgreed: true,
    });
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
        {formTip.isShowTip && (
          <Alert message={formTip.tipContent} type="error" />
        )}

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
            <Button
              type="primary"
              htmlType="submit"
              // disabled={!checked}
            >
              Register
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              Fill form
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default RegistrationForm;
