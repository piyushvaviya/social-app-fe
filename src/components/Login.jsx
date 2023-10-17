import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import CustomButton from "@/common/Button";
import authService from "@services/auth";
import toast from "react-hot-toast";
import { messages } from "@utils/messages";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "@/redux/reducers/authDataSlice";
import _socket from "@helpers/socket";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const authToken = useSelector((state) => state?.authData?.authToken);
  const handleLogin = async (value) => {
    setLoading(true);
    const res = await authService.login(value);

    if (res?.success) {
      const authUser = res?.data?.user;
      const accessToken = res?.data?.accessToken;

      dispatch(setUser(authUser));
      dispatch(setToken(accessToken));

      _socket.emit("new-user-add", authUser.id);

      setLoading(false);
      toast.success("User Login Successfully !");

      navigate(`/`);
      return;
    }

    setLoading(false);
    const errorMsg = messages.resError(res?.message);

    toast.error(errorMsg);
  };

  useEffect(() => {
    if (authToken) {
      navigate(`/`);
    }
  }, [authToken]);

  const onFinish = (values) => {
    handleLogin(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="rounded-md border-2 px-4 py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1 className="text-center text-xl">We are the Devs team</h1>
        <Form
          className="m-4"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            email: "test23@gmail.com",
            password: "12345678",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <h3 className="m-4 text-center text-base">Login to your account</h3>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <CustomButton
              type="primary"
              htmlType="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
              size="default"
              isDisabled={loading}
            >
              Login
            </CustomButton>
          </Form.Item>
          <div className="flex flex-row">
            <NavLink
              className="text-center text-blue-500 cursor-pointer"
              to="/register"
            >
              Create new account
            </NavLink>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
