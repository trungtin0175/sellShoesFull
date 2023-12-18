import classNames from 'classnames/bind';
import styles from '../Register/Register.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { useState } from 'react';
import { loginUser } from '~/services/UserService';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/userSlice';
import * as UserService from '../../services/UserService';
import config from '~/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Login() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [active, setActive] = useState(false);
    const [inputType, setInputType] = useState('password');
    const [isHide, setIsHide] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    // const onSubmit = async (data) => {
    //     try {
    //         const res = await UserService.loginUser(data);
    //         // console.log(res);
    //         dispatch(updateUser(res.user));
    //         toast.success('login successful', { autoClose: 1000 });
    //         setTimeout(() => navigate(config.routes.home), 2000);
    //         console.log(res);
    //         // navigate('/');
    //     } catch (error) {
    //         console.log(error);
    //         if (error?.response?.data.message) {
    //             toast.error(error.response.data.message);
    //         } else {
    //             toast.error('login failure, please check your connect and try again');
    //         }
    //     }
    // };
    const onSubmit = async (data) => {
        try {
            const res = await UserService.loginUser(data);

            dispatch(updateUser(res));
            toast.success('Đăng nhập thành công', { autoClose: 1000 });
            setTimeout(() => navigate(config.routes.home), 2000);
            console.log(res);
            // navigate('/');
        } catch (error) {
            console.log(error);
            if (error?.response?.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại kết nối!');
            }
        }
    };
    // loginUser()
    // const handleSubmit = ()=>{
    //     email: email,
    //     password: password,
    // }
    const handleChange = (e) => {
        const setChange = e.target.value;
        if (setChange.length > 0) {
            setIsHide(true);
        } else {
            setIsHide(false);
        }
        console.log(setChange);
    };
    const handleClose = (e) => {
        e.preventDefault();
        setActive(!active);
        setInputType('password');
    };
    const handleOpen = (e) => {
        e.preventDefault();
        setActive(!active);
        setInputType('text');
    };
    return (
        <div className={cx('main')}>
            <form onSubmit={handleSubmit(onSubmit)} className={cx('form')} id="form-2">
                <h3 className={cx('heading')}>Đăng nhập</h3>
                <p className={cx('desc')}>Cùng nhau shopping nào❤️</p>
                <div className={cx('form-group')}></div>
                <div className={cx('form-group')}>
                    <label htmlFor="email" className={cx('form-label')}>
                        Email
                    </label>
                    <input
                        id="email"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Email is required',
                            },
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Email is not valid',
                            },
                        })}
                        type="text"
                        placeholder="VD: trungtin@gmail.com"
                        className={cx('form-control')}
                        // onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && dirtyFields.email && (
                        <span className={cx('form-message')}>{errors.email.message}</span>
                    )}
                </div>
                <div className={cx('form-group', 'icon-group')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Mật khẩu
                    </label>
                    <input
                        id="password"
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Password is required',
                            },
                            minLength: {
                                value: 6,
                                message: 'Password is at least 6 characters long',
                            },
                        })}
                        // type="password"
                        type={inputType}
                        placeholder="Nhập mật khẩu"
                        className={cx('form-control')}
                        onChange={handleChange}
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className={cx('icon-btn')}>
                        <FontAwesomeIcon
                            onClick={handleClose}
                            className={cx('icon', { active: active })}
                            icon={faEye}
                        />
                        <FontAwesomeIcon
                            onClick={handleOpen}
                            className={cx('icon', { active: !active && isHide })}
                            icon={faEyeSlash}
                        />
                    </div>
                    {errors.password && dirtyFields.password && (
                        <span className={cx('form-message')}>{errors.password.message}</span>
                    )}
                </div>
                <button className={cx('form-submit')}>Đăng nhập</button>
                <ToastContainer />
                <Link to={routes.register} className={cx('register-link')}>
                    Bạn chưa có tài khoản?
                </Link>
            </form>
        </div>
    );
}

export default Login;
