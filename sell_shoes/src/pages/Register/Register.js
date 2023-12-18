import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '~/services/UserService';
import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import config from '~/config/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);
function Register() {
    console.log(123);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: {
            fullname: '',
            numberphone: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });
    const onSubmit = async (data) => {
        try {
            const res = await registerUser(data);
            //
            toast.success('Đăng ký tài khoản thành công!', {
                autoClose: 1000,
            });
            setTimeout(() => navigate(config.routes.login), 2000);
            // navigate('/login');
        } catch (error) {
            console.log(error);
            if (error?.response?.data.message) {
                toast.error(error.response.data.message);
            } else toast.error('Đăng ký thất bai, vui lòng kiểm tra lại kết nối!');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('main')}>
                <form onSubmit={handleSubmit(onSubmit)} className={cx('form')} id="form-1">
                    <h3 className={cx('heading')}>Thành viên đăng ký</h3>
                    <p className={cx('desc')}>Trở thành khách hàng của chúng tôi để có những đôi giày chất lượng❤️</p>
                    <div className={cx('spacer')}></div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="fullname">
                            Tên đầy đủ
                        </label>
                        <input
                            {...register('fullname', {
                                required: {
                                    value: true,
                                    message: 'fullname is required',
                                },
                                minLength: {
                                    value: 2,
                                    message: 'fullname should have at least 2 characters',
                                },
                            })}
                            id="fullname"
                            type="text"
                            placeholder="VD = Trung Tín"
                            className={cx('form-control')}
                        />
                        {errors.fullname && dirtyFields.fullname && (
                            <span className={cx('form-message')}>{errors.fullname.message}</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="numberphone">
                            Số điện thoại
                        </label>
                        <input
                            id="numberphone"
                            {...register('numberphone', {
                                required: {
                                    value: true,
                                    message: 'Phone number is required',
                                },
                                pattern: {
                                    value: /^\d{10}$/,
                                    message: 'Phone number must have exactly 10 digits',
                                },
                            })}
                            type="tel"
                            placeholder="VD = 0901234567"
                            className={cx('form-control')}
                        />
                        {errors.numberphone && dirtyFields.numberphone && (
                            <span className={cx('form-message')}>{errors.numberphone.message}</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="fullname">
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
                            // type="email"
                            placeholder="VD = trungtin@gmail.com"
                            className={cx('form-control')}
                        />
                        {errors.email && dirtyFields.email && (
                            <span className={cx('form-message')}>{errors.email?.message}</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
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
                            placeholder="Mật khẩu"
                            id="password"
                            type="text"
                            className={cx('form-control')}
                        />
                        {errors.password && dirtyFields.password && (
                            <span className={cx('form-message')}>{errors.password.message}</span>
                        )}
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('form-label')} htmlFor="password_confirmation">
                            Nhập lại mật khẩu
                        </label>
                        <input
                            id="password_confirmation"
                            {...register('password_confirmation', {
                                required: {
                                    value: true,
                                    message: 'Password is required',
                                },
                                validate: {
                                    compareValue: (value) =>
                                        value === getValues('password') || 'confirm password must equal to password',
                                },
                            })}
                            placeholder="Nhập lại mật khẩu"
                            type="text"
                            className={cx('form-control')}
                        />
                        {errors.password_confirmation && dirtyFields.password_confirmation && (
                            <span className={cx('form-message')}>{errors.password_confirmation?.message}</span>
                        )}
                    </div>
                    <button className={cx('form-submit')}>Đăng ký</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
