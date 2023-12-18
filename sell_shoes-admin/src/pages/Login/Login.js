import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
// import { useState } from 'react';
// import { loginUser } from '~/services/UserService';
import { useDispatch } from "react-redux";
import { updateUser } from "~/redux/userSlice";
import * as UserService from "../../services/UserService";
import config from "~/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      const res = await UserService.loginUser(data);

      dispatch(updateUser(res.user));
      toast.success("Đăng nhập thành công!", { autoClose: 1000 });
      setTimeout(() => navigate(config.routes.home), 2000);
      console.log(res);
      // navigate('/');
    } catch (error) {
      console.log(error);
      if (error?.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Thất bại, vui lòng kiểm tra lại kết nối!");
      }
    }
  };
  return (
    <div className={cx("main")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cx("form")}
        id="form-2"
      >
        <h3 className={cx("heading")}>Đăng nhập</h3>
        <p className={cx("desc")}>Tài khoản của admin❤️</p>
        <div className={cx("form-group")}></div>
        <div className={cx("form-group")}>
          <label htmlFor="email" className={cx("form-label")}>
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Email is not valid",
              },
            })}
            type="text"
            placeholder="VD: trungtin@gmail.com"
            className={cx("form-control")}
            // onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && dirtyFields.email && (
            <span className={cx("form-message")}>{errors.email.message}</span>
          )}
        </div>
        <div className={cx("form-group")}>
          <label htmlFor="password" className={cx("form-label")}>
            Mật khẩu
          </label>
          <input
            id="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password is at least 6 characters long",
              },
            })}
            type="password"
            placeholder="Nhập mật khẩu"
            className={cx("form-control")}
            // onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && dirtyFields.password && (
            <span className={cx("form-message")}>
              {errors.password.message}
            </span>
          )}
        </div>
        <button className={cx("form-submit")}>Đăng nhập</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
