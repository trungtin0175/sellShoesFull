import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);
function Slide() {
    const [blog, setBlog] = useState([]);
    const slideRef = useRef(null);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const prev = () => {
        slideRef.current.slickPrev();
    };
    const next = () => {
        slideRef.current.slickNext();
    };
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/all/blog')
            .then((respone) => {
                setBlog(respone.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    console.log('blog', blog._id);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide')}>
                <div className={cx('slide-show')}>
                    <Slider {...settings} ref={slideRef}>
                        {blog.map((image, index) => (
                            <div className={cx('slide-wrapper')}>
                                <img key={index} src={image.image} alt="slider" className={cx('slide-img')} />
                                {/* {blogLink.map} */}
                                <Link to={`/api/blog/detail/${image._id}`}>
                                    <div className={cx('slide-link')}>Xem thêm</div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className={cx('btn-prev')} onClick={() => prev()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={cx('btn-next')} onClick={() => next()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </div>
    );
}
// Slide.prototype = {
//     arrImages: PropTypes.array.isRequired,
// };

export default Slide;
