import React from "react";
import {Button, Form, Input, message} from 'antd';
import axios from 'axios';

import {BASE_URL} from "../constants";
import {AntCloudOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 7},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 17},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 17,
            offset: 0,
        },
        sm: {
            span: 17,
            offset: 7,
        },
    },
};

function Register(props) {
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form: ', values);
        // step1: get username and password
        const {username, password} = values;
        const opt = {
            method: 'POST',
            url: `${BASE_URL}/signup`,
            data: {
                username: username,
                password: password
            },
            headers: {'content-type': 'application/json'}
        };
        // step2: send register info to the server
        axios(opt)
            .then(response => {
                console.log(response)
                // case1: registered success, display login
                if (response.status === 200) {
                    message.success('Registration succeed!');
                    props.history.push('/login');
                }
            })
            .catch(error => {
                // case2: registered fail, display error
                console.log('register failed: ', error.message);
                message.error('Registration failed!');
                // throw new Error('Signup Failed!')
            })
    };

    const onCancel = values => {
        props.history.goBack();
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="register"
        >
            <div className="register-icon">
                <AntCloudOutlined/>
            </div>

            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    size={"large"}
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    size={"large"}
                />
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
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    size={"large"}
                />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="register-btn">
                    Register
                </Button>
                <Button className="register-btn" onClick={onCancel}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Register;