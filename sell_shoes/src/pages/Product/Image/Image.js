import React from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
import { useState, useRef } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';

const cx = classNames.bind(styles);
// const arrImg = [
//     {
//         id: 1,
//         img: 'https://img.mwc.com.vn/giay-thoi-trang?w=1150&h=0&FileInput=//Upload/2022/11/batch-z3862079935033-f6bccda75e03c97943ade02d90bdb3fd-d109ebcd-d279-4b6a-b375-1444e10ff4d4.jpg',
//     },
//     { id: 2, img: 'https://kaiwings.vn/upload/product/kw-054/giay-zip-bot-nam-cao-co-da-bo-dep-hang-hieu.jpg' },
//     { id: 3, img: 'https://anv.vn/wp-content/uploads/2020/10/giay-chay-bo-nam-3.jpg' },
//     { id: 4, img: 'https://vcdn-giadinh.vnecdn.net/2020/03/24/5d034e198bd1a-em004ba-01-8780-1585039024.jpg' },
//     { id: 5, img: 'https://vcdn-giadinh.vnecdn.net/2020/03/24/5d034e198bd1a-em004ba-01-8780-1585039024.jpg' },
//     { id: 6, img: 'https://kaiwings.vn/upload/product/kw-054/giay-zip-bot-nam-cao-co-da-bo-dep-hang-hieu.jpg' },
//     { id: 7, img: 'https://anv.vn/wp-content/uploads/2020/10/giay-chay-bo-nam-3.jpg' },
// ];
function Image({ products }) {
    const [selectedImg, setSelectedImg] = useState('');
    const [colorIndex, setColorIndex] = useState(0);
    const [slideImg, setSlideImg] = useState([0, 4]);
    const slideRef = useRef(null);
    const settings = {
        // dots: true,
        infinite: true,
        // speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 3000,
    };
    const prev = () => {
        if (slideImg[0] > 0) {
            setSlideImg([slideImg[0] - 1, slideImg[1] - 1]);
        }
    };
    const next = () => {
        if (slideImg[1] < products.image.length) {
            setSlideImg([slideImg[0] + 1, slideImg[1] + 1]);
        }
    };
    const handleImageClick = (img, index) => {
        setSelectedImg(img);
        setColorIndex(index);
    };
    const firstImg = products.image[0];
    console.log('firstImg', products.image);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-img')}>
                {/* <div
                    className={cx('zoom-container', { 'img-zoom': isZoom })}
                    onMouseEnter={handleZoom}
                    onMouseLeave={handleZoomOut}
                > */}
                {/* <img className={cx('wrapper-img_main')} src={selectedImg || firstImg} alt="Hình ảnh" /> */}
                {/* </div> */}
                <div className={cx('wrapper-img_main')}>
                    <ReactImageMagnify
                        {...{
                            smallImage: {
                                alt: 'Hình ảnh',
                                isFluidWidth: true,
                                src: selectedImg || firstImg,
                                // srcSet: this.srcSet,
                                // sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
                                // width: 140,
                                // height: 162,
                            },
                            largeImage: {
                                alt: '',
                                src: selectedImg || firstImg,
                                width: 1600,
                                height: 1400,
                            },
                            // lensStyle: 'cursor: zoom-in', // Tùy chỉnh kiểu lens
                            lensStyle: { cursor: 'zoom-in' },
                            // isHintEnabled: true,
                            // enlargedImagePosition: 'over',
                            // lensStyle: { backgroundColor: 'rgba(0,0,0,.6' },
                        }}
                    />
                </div>
            </div>
            <div className={cx('wrapper-extra')}>
                {/* <Slider {...settings} ref={slideRef}>
                    {arrImg.map((image, index) => (
                        <div
                            className={cx('wrapper-supp')}
                            key={index}
                            style={{ borderColor: index === colorIndex ? 'red' : 'black' }}
                        >
                            <img
                                className={cx('wrapper-supp_img')}
                                src={image.img}
                                alt="Hình ảnh"
                                onClick={() => handleImageClick(image.image, index)}
                            />
                        </div>
                        // <img key={index} src={image.img} alt="slider" className={cx('slide-img')} />
                    ))}
                </Slider>
                <div className={cx('btn-prev')} onClick={() => prev()}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={cx('btn-next')} onClick={() => next()}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div> */}
                {products.image.slice(...slideImg).map((img, index) => (
                    <div
                        className={cx('wrapper-supp')}
                        key={index}
                        style={{ borderColor: index === colorIndex ? 'red' : 'black' }}
                    >
                        <img
                            className={cx('wrapper-supp_img')}
                            src={img}
                            alt="Hình ảnh"
                            onClick={() => handleImageClick(img, index)}
                        />
                    </div>
                ))}
                {products.image.length > 4 ? (
                    <>
                        <div className={cx('btn-prev')} onClick={() => prev()}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>
                        <div className={cx('btn-next')} onClick={() => next()}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Image;
