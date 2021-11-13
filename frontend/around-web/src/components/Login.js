import React from "react";
import {Button, Form, Input, message} from "antd";
import {AntCloudOutlined, LockOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import axios from "axios";

import {BASE_URL} from "../constants";

function Login(props) {
    const {handleLoggedIn} = props;

    const onFinish = (values) => {
        const {username, password} = values;
        const opt = {
            method: "POST",
            url: `${BASE_URL}/signin`,
            data: {
                username: username,
                password: password
            },
            headers: {"Content-Type": "application/json"}
        };
        // send user info to server
        axios(opt)
            // case1: success: send token data to app
            .then((res) => {
                if (res.status === 200) {
                    const {data} = res;
                    handleLoggedIn(data);
                    message.success("Login succeed! ");
                }
            })
            // case2: failed -> display error info
            .catch((err) => {
                console.log("login failed: ", err.message);
                message.error("Login failed!");
            });
    };

    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <div className="login-icon">
                <AntCloudOutlined/>
            </div>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please input your Username!"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon"/>}
                    placeholder="Username"
                    size={"large"}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                    size={"large"}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
            </Form.Item>
        </Form>
    );
}

export default Login;