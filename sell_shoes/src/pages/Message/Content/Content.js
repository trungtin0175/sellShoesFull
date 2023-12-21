import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Messenge from './Messenge';
import { useState } from 'react';

const cx = classNames.bind(styles);
function Content({ data }) {
    const [expandedImage, setExpandedImage] = useState(null);
    console.log('ex', expandedImage);
    const handleImageClick = (imageSrc) => {
        setExpandedImage(imageSrc);
    };
    const closeExpandedImage = () => {
        setExpandedImage(null);
    };
    const renderExpandedImage = () => {
        if (expandedImage) {
            return (
                <div className={cx('expanded-image-overlay')} onClick={closeExpandedImage}>
                    <img
                        className={cx('expanded-image')}
                        src={expandedImage[0]}
                        alt="hinhanh"
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpandedImage(null);
                        }} // Ngăn chặn sự kiện nhấp vào overlay từ lan ra
                    />
                </div>
            );
        }
        return null;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('name')}>Admin</h3>
            </div>
            <div className={cx('content')}>
                {/* <div className={cx('content-item')}> */}
                {Array.isArray(data.messages) && data.messages.length > 0 ? (
                    data.messages
                        .slice()
                        .reverse()
                        .map((mes, index) => <Messenge handleImageClick={handleImageClick} key={index} mes={mes} />)
                ) : (
                    <></>
                )}
                {/* </div> */}
            </div>
            {renderExpandedImage()}
        </div>
    );
}

export default Content;
