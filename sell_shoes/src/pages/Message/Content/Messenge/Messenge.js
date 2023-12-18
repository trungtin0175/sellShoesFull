import classNames from 'classnames/bind';
import styles from './Messenge.module.scss';
import images from '~/assets/images';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

const cx = classNames.bind(styles);
function Message({ mes }) {
    const user = useSelector((state) => state.user);
    const formattedTime = format(new Date(mes.createdAt));

    const [owner, setOwner] = useState(user._id === mes.senderId._id);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('message', { owner: user._id === mes.senderId._id })}>
                {/* <div className={cx('message-info')}>
                    <img alt="avatar" src={images.Facebook_Logo} className={cx('message-info-img')} />
                    <span>{formattedTime}</span>
                </div> */}
                <div className={cx('message-content')}>
                    {mes.image && mes?.image.length > 0 ? (
                        <img className={cx('message-content-image')} src={mes.image} alt="hinhanh"></img>
                    ) : (
                        <p className={cx('message-content-item')}>{mes.content}</p>
                    )}

                    <span className={cx('message-content-time')}>{formattedTime}</span>

                    {/* <img alt="avatar" src={images.user} /> */}
                </div>
            </div>
        </div>
    );
}

export default Message;
